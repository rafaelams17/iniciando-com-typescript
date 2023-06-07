import { Router } from "express";
import knex from "../database/connection"; // conexão com o bd

const itemsRouter = Router();

// a rota está sendo criada aqui, por isso deve ser get()
itemsRouter.get('/', async (request, response) => { 
    const items = await knex('items').select('*'); // pegar todos os dados da tabela

    const serializedItems = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `http://localhost:3333/uploads/${item.image}`
        }
    });

    return response.json(serializedItems);
});

export default itemsRouter; 