import express from "express";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/index.js";
import produtosRouter from "./routes/produtos.js";
import voosRouter from "./routes/voos.js";
import pingRouter from "./routes/ping.js";
import alunosRouter from "./routes/alunos.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();

server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(express.static(path.join(__dirname, 'public')));

server.use('/', router);
server.use('/produtos', produtosRouter);
server.use('/voos', voosRouter);
server.use('/ping', pingRouter);
server.use('/alunos', alunosRouter);

server.listen(3000, () => {
    console.log('Servidor funcionando no link http://localhost:3000')
});