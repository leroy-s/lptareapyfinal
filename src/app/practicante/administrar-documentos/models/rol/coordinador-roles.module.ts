export class Roles {
    id : number;
    rol : string;
    estado : string;

    constructor(id: number = 0,rol : string='',estado : string=''){
        this.id=id;
        this.rol=rol;
        this.estado=estado;
    }
}
