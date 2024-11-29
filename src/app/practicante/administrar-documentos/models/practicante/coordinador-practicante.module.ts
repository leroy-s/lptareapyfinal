import { Persona } from "../persona/coordinador-persona.module";

export class Practicante { 
  id: number;
  año_estudio: string;
  personas:Persona;
  constructor(
    id: number = 0,
    año_estudio: string='',
    personas:Persona=new Persona()
  ){
    this.id=id;
    this.año_estudio=año_estudio;
    this.personas=personas
  }
}
