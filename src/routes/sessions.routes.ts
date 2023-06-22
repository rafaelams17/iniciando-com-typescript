import { Router, request } from "express";
import { compare } from "bcryptjs"; // metodo para comparar um senha criptograda e uma não criptografada
import { sign } from "jsonwebtoken";
import knex from "../database/connection"; // conexão com o bd
import authConfig from "../config/auth";

const sessionsRouter = Router();

// rota para fazer a a utenticação do usuário
sessionsRouter.post('/', async(request, response) => {
    const { email, password } = request.body;
    const user = await knex('users').where('email', email).first();
 
    // se não houver email
    if(!user){
        return response.status(400).json({message: 'Credentials not found.'});
    }

    const comparePassword = await compare(password, user.password); // comparar as senhas

    if(!comparePassword){
        return response.status(400).json({message: 'Credentials not found.'});
    }

    // construir o Token JWT
    const token = sign({}, authConfig.jwt.secret, {
        subject: String(user.id),
        expiresIn: authConfig.jwt.expiresIn,
    });

    return response.json({user, token});
        
});

export default sessionsRouter; 
