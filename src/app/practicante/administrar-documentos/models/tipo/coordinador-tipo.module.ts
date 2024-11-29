
export class Tipo {
  id: number;
  estado: string;
  nombre: string;
  porcentaje: number;
  
  constructor(
    id: number = 0,
    estado: string='',
  nombre: string='',
  porcentaje: number=0
  ){
    this.id=id;
    this.estado=estado;
    this.nombre=nombre;
    this.porcentaje=porcentaje;
  }
 }
