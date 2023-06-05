import express from "express"; // importa o Express
import routes from "./routes"; // importar as rotas 

const app = express(); // instancia do Express

app.use(routes); // chama o arquivoo

app.listen(3333, () => {
    console.log("Server started on port 3333");
});
