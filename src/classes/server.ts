import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIo from  'socket.io'
import http from 'http'
import * as socketConfig from '../sockets/socket';

export default class Server {

    private static _instance: Server;



    public app: express.Application;
    public port: number; 

    public io: socketIo.Server;
    private httpServer: http.Server;


    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;


        // creand una configuracion de servidor con httpl confirguracion será la creada con express
        this.httpServer = new http.Server(this.app);
        this.io = socketIo(this.httpServer);

        this.escucharSockets();
    }

    public static get instance() {
        return this._instance || (this._instance = new this())
    }


    private escucharSockets() {
        console.log('Escuchando conecciones');


        this.io.on('connection', cliente => {
            console.log('nuevo cliente conectado');



            // recibiendo mensaje
            socketConfig.mensaje(cliente, this.io);


            // desconectar
            socketConfig.desconectar(cliente);

            // Configurar suario
            socketConfig.configurarUsuario(cliente, this.io);
        });
        
    }

    start(callback: Function) {
        this.httpServer.listen(this.port, callback());
    }
}