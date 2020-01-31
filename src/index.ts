import { SERVER_PORT } from "./global/enviroment";
import Server from './classes/server';
import cors from 'cors';
import bodyParser from "body-parser";


const server = Server.instance;

// BodyParser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

// CORS
server.app.use(cors({origin: true, credentials: true}));

server.start( () => {
    console.log(`Servidor correndo en puerto ${SERVER_PORT}`);
});