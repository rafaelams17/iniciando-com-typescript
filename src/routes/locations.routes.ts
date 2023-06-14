import { Router } from "express";
import knex from "../database/connection"; 

const locationsRouter = Router();

locationsRouter.post('/', async (request, response) => {     
    const { 
        name, email, whatsapp, latitude, longitude, city, uf, items 
    } = request.body;

    const location = { 
        image: "fake-image.jpg", 
        name, 
        email, 
        whatsapp, 
        latitude, 
        longitude, 
        city, 
        uf   
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
    await transaction('locations_items').insert(locationItems);

    await transaction.commit(); // fim da transação - confirma que a transação está OK

    return response.json({
        id: location_id, 
        ... location, // esse operador quer dizer que é para trazer toda informação que esta no objeto
    });
});

export default locationsRouter; 