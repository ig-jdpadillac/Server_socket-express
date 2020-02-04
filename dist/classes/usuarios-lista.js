"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UsuariosLista {
    constructor() {
        this.lista = [];
    }
    agregarUsuario(usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }
    actualizarNombre(id, nombre) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log('Actualizando usuario');
        console.log(this.lista);
    }
    getLista() {
        return this.lista;
    }
    getUsuario(id) {
        return this.lista.find(usuario => {
            return usuario.id === id;
        });
    }
    getUsuariosEnSala(sala) {
        return this.lista.filter(usuario => usuario.sala === sala);
    }
    borrarUsuario(id) {
        const tempUser = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => usuario.id !== id);
        return tempUser;
    }
}
exports.UsuariosLista = UsuariosLista;
