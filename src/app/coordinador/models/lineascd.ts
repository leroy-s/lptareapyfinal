export class Lineascd {
    id : number;
    nombre : string;
    estado : string;
    Nota_max : string;

    constructor(id: number = 0, nombre: string = '',estado: string = '',Nota_max: string = '') {
        this.id = id;
        this.nombre = nombre;
        this.estado = estado;
        this.Nota_max = Nota_max;
      }
}
