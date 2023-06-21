import { Router, request } from "express";
import { hash } from "bcryptjs";
import knex from "../database/connection"; // conexão com o bd

const usersRouter = Router();

// rota para listar os usuários
usersRouter.get('/', async(request, response) => {
    const users = await knex('users').select('*');

    return response.json(users);
});

// rota para criar os usuários
usersRouter.post('/', async(request, response) => {
    const { name, email, password } = request.body;
    const passwordHashed = await hash(password, 8); // criptografar a senha
    const user = { name, email, password: passwordHashed };
    const newsIds = await knex('users').insert(user);

    return response.json({
        id: newsIds[0], 
        ... user,
    });
});

export default usersRouter; 