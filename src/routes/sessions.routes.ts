import { Router, request } from "express";
import { compare } from "bcryptjs"; // metodo para comparar um senha criptograda e uma não criptografada
import { sign } from "jsonwebtoken";
import knex from "../database/connection"; // conexão com o bd

const sessionsRouter = Router();

// rota para fazer a a utenticação do usuário
sessionsRouter.post('/', async(request, response) => {
    const { email, password } = request.body;
    const user = await knex('users').where('email', email).first();
 
    // se não houver email
    if(!user){
        return response.status(400).json({message: 'Credentials not found.'});
    }

    const comparePassword = compare(password, user.password); // comparar as senhas

    if(!comparePassword){
        return response.status(400).json({message: 'Credentials not found.'});
    }

    // construir o Token JWT
    const token = sign({},'86a79446f5ab5a8a667407a1d0fb6ea3', {
        subject: String(user.id),
        expiresIn: '1d',
    });

    return response.json({user, token});
        
});

export default sessionsRouter; 