import { Router } from "express";
import knex from "../database/connection"; // conexão com o bd
import env from "../config/env";

const itemsRouter = Router();

// a rota está sendo criada aqui, por isso deve ser get()
itemsRouter.get('/', async (request, response) => { 
    const items = await knex('items').select('*'); // pegar todos os dados da tabela

    const serializedItems = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `${env.host}:${env.port}/uploads/${item.image}`,
        };
    });

    return response.json(serializedItems);
});

export default itemsRouter; 