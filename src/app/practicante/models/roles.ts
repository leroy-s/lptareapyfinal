export class Roles {
    id : number;
    usuario : string;
    estado : string;

    constructor(id: number = 0,usuario : string='',estado : string=''){
        this.id=id;
        this.usuario=usuario;
        this.estado=estado;
    }
}
