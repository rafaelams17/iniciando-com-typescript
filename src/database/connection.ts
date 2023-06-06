// arquivo para fazer a conexão com o banco de dados

import knex from "knex"; // importar o knex para conectar com o bd no caso sqlite
import path from "path"; // biblioteca do node para tratar caminho do sistema de arquivos 

const connection = knex({ // instancia do knex que de fato fazer conexão com o banco de dados 
    client: "sqlite3", // indica qual SGBD será usado
    connection: { // pode variar de acordo com o banco de dados
        filename: path.resolve(__dirname, "database.sqlite") // local que vai esta o arquivo 
    }, 
    useNullAsDefault: true,
}); 

export default connection;