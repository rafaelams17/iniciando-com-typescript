import { Router } from "express";
import knex from "../database/connection"; 

const locationsRouter = Router();

locationsRouter.post('/', async (request, response) => { 
    const { name, email, whatsapp, latitude, longitude, city, uf, items } = request.body;

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

    const newIds = await knex('locations').insert(location); // inserir a informação do banco de dados

    const locationId = newIds[0];

    const locationItens = items.map((item_id: number)=> {
        return {
            item_id,
            location_id: locationId,
        }
    });
    // tablelas que relaciona os itens com os locais
    await knex('locations_items').insert(locationItens);

    return response.json({
        id: locationId, 
        ... location, // esse operador quer dizer que é para trazer toda informação que esta no objeto
    });
});

export default locationsRouter; 