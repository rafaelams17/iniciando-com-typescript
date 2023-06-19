import multer from 'multer'; // importar o multer
import path from 'path';
import crypto from 'crypto';

export default { // configurar o uploads, no caso a configuração da biblioteca multer
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, "..", "uploads"), // definir onde os arquivos enviados serão guardados   
        // destination: path.resolve(__dirname, "..", "..", "uploads"), // cria um pasta e salva os aqruivos nela   

        filename(req, file, callback) {
            const hash = crypto.randomBytes(6).toString('hex');
            const fileName = `${hash}-${file.originalname}`; // esse hash garante que os arquivos não terão o mesmo nome no servidor

            callback(null, fileName); // retornar o nome do arquivo
        },
    })
}