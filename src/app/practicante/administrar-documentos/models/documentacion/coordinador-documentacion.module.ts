import { Practicas } from "../practica/coordinador-practica.module";
import { Tipo_Documento } from "../tipodocumento/coordinador-tipodocumento.module";

export class Documentacion {
  id: number; 
  estado: string; 
  fechaGenerada: Date;
  archivo: Blob | null; 
  tipoDocumento: Tipo_Documento;
  practica: Practicas; 
  constructor(
    id: number = 0,
    estado: string = '',
    fechaGenerada: Date = new Date(),
    archivo: Blob | null = null,
    tipoDocumento: Tipo_Documento = new Tipo_Documento(),
    practica: Practicas = new Practicas()
  ) {
    this.id = id;
    this.estado = estado;
    this.fechaGenerada = fechaGenerada;
    this.archivo = archivo;
    this.tipoDocumento = tipoDocumento;
    this.practica = practica;
  }
}
