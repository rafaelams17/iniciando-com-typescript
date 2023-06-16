import { Router, request, response } from "express";
import knex from "../database/connection"; 

const locationsRouter = Router();

// exibir uma location 
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
locationsRouter.post('/', async (request, response) => {     
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

export default locationsRouter; 