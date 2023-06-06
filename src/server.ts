import express from "express"; // importa o Express
import path from "path";
import routes from "./routes"; // importar as rotas 

const app = express(); // instancia do Express

app.use(routes); // chama o arquivo
app.use('/uploads', express.static(path.resolve(__dirname, '.', 'uploads'))); // rota estática

app.listen(3333, () => {
    console.log("Server started on port 3333");
});
