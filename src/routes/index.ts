// arquivo para tratar as rotas de forma separada do arquivo principal
// repositório das rotas 

import { Router } from "express";
import itemsRouter from "./items.routes";
import locationsRouter from "./locations.routes";
import usersRouter from "./users.routes";


const routes = Router();

// a rota está sendo usada aqui, por isso deve ser use()
routes.use('/items', itemsRouter); 
routes.use('/locations', locationsRouter);
routes.use('/users', usersRouter);

export default routes; // necessario para que os outros arquivos veja as rotas
