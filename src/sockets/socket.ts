import { Socket } from 'socket.io';



export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    })

}


// Escuchar mensajes
export const mensaje = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('mensaje', (payload: any) => {
        io.emit('mensaje-nuevo', payload);
    });
}


// consfigurar usuario
export const configurarUsuario = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('configurar-usuario', (payload: any, callbak: Function) => {
        console.log('COnfigurando  usuario', payload);


        callbak({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado correctamente`,
        })
    });
}