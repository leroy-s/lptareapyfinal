import { Practicas } from "../practica/coordinador-practica.module";

export class Programacion { 
  id: number;
  fecha_evaluacion: Date;
  
  link: string;
semana:number;
practicas:Practicas;
  constructor(
    id: number = 0,
    fecha_evaluacion: Date=new Date(),
  
  link: string='',
semana:number=0,
practicas:Practicas=new Practicas()
  ) {
    this.id = id;
    this.fecha_evaluacion=fecha_evaluacion;
    this.link=link;
    this.semana=semana;
    this.practicas=practicas;
  }
}
