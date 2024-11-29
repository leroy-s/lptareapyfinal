import { EscuelaProfesional } from "../escuelaprofesional/coordinador-escuelaprofesional.module"; 
import { Practicante } from "../practicante/coordinador-practicante.module"; 

export class PracticanteEP {
  id: number;
  escuelasprofesionales: EscuelaProfesional;
  practicantes: Practicante;
  semestre: string;

  constructor(
    id: number = 0,
    escuelasprofesionales: EscuelaProfesional = new EscuelaProfesional(),
    practicantes: Practicante = new Practicante(),   
    semestre: string = ""
  ) {
    this.id = id;
    this.escuelasprofesionales = escuelasprofesionales;
    this.practicantes = practicantes;
    this.semestre = semestre;
  }
}
