
export class Linea { 
  id: number;
  estado: string;
  nombre: string;
  nota_max: string;
  
  constructor(
    id: number = 0,
    estado: string='',
  nombre: string='',
  nota_max: string=''
  ){
    this.id=id;
    this.estado=estado;
    this.nombre=nombre;
    this.nota_max=nota_max;
  }
}
