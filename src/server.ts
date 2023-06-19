import express from "express"; // importa o Express
import cors from "cors"; // importa o CORS
import path from "path"; 
import routes from "./routes"; // importar as rotas 
import { errors } from "celebrate";


const app = express(); // instancia do Express

app.use(cors()); // permita que qualque domínio acesse a API
// app.use(cors({
//     origin: ['dominio.com.br', 'aluiziodeveloper.com'], // limita o acesso
// }))
app.use(express.json()); // deixar explicito para o Express que ele vai interpretar JSON 
app.use(routes); // chama o arquivo
app.use('/uploads', express.static(path.resolve(__dirname, '.', 'uploads'))); // rota estática
app.use(errors()); // é uma forma da API conseguir retornar os erros que foram gerados

app.listen(3333, () => {
    console.log("Server started on port 3333");
});
