import express from "express";
import helmet from "helmet";
import path from "path";
import { fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();

server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(express.static(path.join(__dirname, 'public')));

server.get('/', (req, res) => {

    let name = 'Larissa Feitosa';
    let age = 19;

    res.json({ name, age});
   
})

server.listen(3000, () => {
    console.log('Servidor funcionando no link http://localhost:3000')
});