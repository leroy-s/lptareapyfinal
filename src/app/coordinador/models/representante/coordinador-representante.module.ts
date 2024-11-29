import { Empresa } from "../empresa/coordinador-empresa.module";


export class Representante { 
  id: number;

  apellido: string;
  cargo: string;
  correo_elec: string;
  empresas:Empresa;
  nombre: string;
  
  telefono: string;

  constructor(
      id: number = 0, 
    

      apellido: string='',
      cargo: string='',
      correo_elec: string='',
      empresas:Empresa=new Empresa(),
      nombre: string='',
      
      telefono: string='' 
  ) {
      this.id = id;
      
      this.apellido = apellido;
      this.cargo = cargo;
      this.correo_elec = correo_elec;
      this.empresas = empresas;
      this.nombre = nombre;
   
      this.telefono = telefono;
  }
}
