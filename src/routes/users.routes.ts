import { Router, request } from "express";
import knex from "../database/connection"; // conexão com o bd

const usersRouter = Router();

usersRouter.get('/', async(request, response) => {
    const users = await knex('users').select('*');

    return response.json(users);
});

usersRouter.post('/', async(request, response) => {
    const { name, email, password } = request.body;
    const user = { name, email, password };
    const newsIds = await knex('users').insert(user);

    return response.json({
        id: newsIds[0], 
        ... user,
    });
});

export default usersRouter; 