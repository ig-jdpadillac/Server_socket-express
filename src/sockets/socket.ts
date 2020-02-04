import { Socket } from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados: UsuariosLista = new UsuariosLista();

export const conectarCliente = (cliente: Socket) => {
    const usuario: Usuario = new Usuario(cliente.id);
    usuariosConectados.agregarUsuario(usuario);
};



export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
        const usuarioEliminado  = usuariosConectados.borrarUsuario(cliente.id);
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


        usuariosConectados.actualizarNombre(cliente.id, payload.nombre)

        callbak({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado correctamente`,
        })
    });
}