// arquivo para tratar as rotas de forma separada do arquivo principal
import { Router } from "express";

const routes = Router();

routes.get("/", (request, response) => { // rota get()
    return response.json({ message: "Olá Dev!" });
});

export default routes; // necessario para que os outros arquivos veja as rotas