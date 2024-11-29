export class Accesos {
    id : number;
    tipo_vista : string;
    estado : string;

    constructor(id: number = 0,tipo_vista : string='',estado : string=''){
        this.id=id;
        this.tipo_vista=tipo_vista;
        this.estado=estado;
    }

}
