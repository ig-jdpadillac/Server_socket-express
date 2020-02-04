"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usuarios_lista_1 = require("../classes/usuarios-lista");
const usuario_1 = require("../classes/usuario");
exports.usuariosConectados = new usuarios_lista_1.UsuariosLista();
exports.conectarCliente = (cliente) => {
    const usuario = new usuario_1.Usuario(cliente.id);
    exports.usuariosConectados.agregarUsuario(usuario);
};
exports.desconectar = (cliente) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
        const usuarioEliminado = exports.usuariosConectados.borrarUsuario(cliente.id);
    });
};
// Escuchar mensajes
exports.mensaje = (cliente, io) => {
    cliente.on('mensaje', (payload) => {
        io.emit('mensaje-nuevo', payload);
    });
};
// consfigurar usuario
exports.configurarUsuario = (cliente, io) => {
    cliente.on('configurar-usuario', (payload, callbak) => {
        exports.usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        callbak({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado correctamente`,
        });
    });
};
