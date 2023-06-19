import { Router, request, response } from "express";
import knex from "../database/connection"; 
import multer from "multer";
import multerConfig from "../config/multer";
import { celebrate, Joi } from "celebrate";

const locationsRouter = Router();
const upload = multer(multerConfig); // passando as configurações do multer 

// exibir uma location - eu apgauei depois olhar os commit e colocar aqui novamente
locationsRouter.get('/', async(request, response) => {
    const { city, uf, items } = request.query;

    if(city && uf && items) {
        const parsedItems: Number[] = String(items).split(',').map(item =>  Number(item.trim()));
        const locations = await knex('locations')
            .join('location_items', 'locations.id', '=', 'location_items.location_id')
            .whereIn('location_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('locations.*');
        
        return response.json(locations);
    } else {
        const locations = await knex('locations').select('*');
        return response.json(locations);  
    }
});

// exibir uma location com parametro na rota URL
locationsRouter.get('/:id', async(request, response) => {
    // pegar o parametro da rota id
    const { id } = request.params;

    // acessar o BD e buscar as informações referente a esse id
    const location = await knex('locations').where('id', id).first(); // testar com e sem o first

    if(!location) {
        return response.status(400).json({message: 'Location not found'});
    }

    // retornar os itens da location fazendo uma junção das tabelas items e location_items
    const items = await knex('items')
    .join('location_items', 'items.id', '=', 'location_items.item_id')
    .where('location_items.location_id', id)
    .select('items.title');

    console.log(items)

    return response.json({location, items});  
});

// esta função continua com erros 
locationsRouter.post('/', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required(),
    })
}, {
    abortEarly: false, // faz com que mostre todos os erros 
}), async (request, response) => {     
    try {
        const { 
            name, email, whatsapp, latitude, longitude, city, uf, items 
        } = request.body;
    
        const location = { 
            image: "fake-image.jpg", name, email, whatsapp, latitude, longitude, city, uf   
        };
    
        // criar uma transação no BD - operação única
        const transaction = await knex.transaction();
        
        const newIds = await transaction('locations').insert(location); // inserir a informação do banco de dados
    
        const location_id = newIds[0];
    
        // Esta funcionando está dando alguns erros, vou continuar o curso!
        const locationItems = items.map((item_id: number) => {
            const selectedItem = transaction('items').where('id', item_id).first(); // verificar se tem o id - consulta na tabela de item
                  
            if (!selectedItem) { // se não houver conteúdo
                return response.status(400).json({ message: 'Item not found.' });
            }        
            return {
                item_id,
                location_id // short sintaxe
            }  
        });
    
        // tablela pivô que relaciona os itens com os locais
        await transaction('location_items').insert(locationItems);
        
        await transaction.commit(); // fim da transação - confirma que a transação está OK
    
        return response.json({
            id: location_id, 
            ... location, // esse operador quer dizer que é para trazer toda informação que esta no objeto
        });
    } catch(error) {
        console.error("Error:", error);
    }
});

// rota para alterar algo, e vc precisar o que será alterado
locationsRouter.put('/:id', upload.single('image'), async (request, response) => {
    const { id } = request.params;
    const image = request.file?.filename; // pegar somente o arquivo

    const location = await knex('locations').where('id', id).first();

    // se o id não exite na tabela
    if(!location) {
        return response.status(400).json({message: 'Locations not found!'});
    }

    // se houver algo na location

    // nessa variável pegar todos os elementos que estão na tabela location e insere o item image na tabela
    const locationUpdated = {...location, image};

    
    await knex('locations').update(locationUpdated).where('id', id);
    console.log(locationUpdated);

    return response.json(locationUpdated);
})

export default locationsRouter; 