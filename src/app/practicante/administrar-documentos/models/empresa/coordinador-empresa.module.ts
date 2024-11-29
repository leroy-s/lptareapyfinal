
export class Empresa { 
  id: number;
  descripcion: string;
  direccion: string;
  razon_social: string;
  ruc:string;

  constructor(id: number = 0, descripcion: string='',direccion:string='',
    razon_social: string='',
    ruc:string='') {
  this.id = id;
  this.descripcion = descripcion;
  this.direccion=direccion;
  this.razon_social = razon_social;
  this.ruc=ruc;
  }
}
