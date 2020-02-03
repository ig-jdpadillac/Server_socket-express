"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desconectar = (cliente) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
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
        console.log('COnfigurando  usuario', payload);
        callbak({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado correctamente`,
        });
    });
};
