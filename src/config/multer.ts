import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, "..", "..", "uploads"), // definir onde os arquivos enviados enviados serão guardados   
        filename(req, file, callback) {
            const hash = crypto.randomBytes(6).toString('hex');
        },
    })
}