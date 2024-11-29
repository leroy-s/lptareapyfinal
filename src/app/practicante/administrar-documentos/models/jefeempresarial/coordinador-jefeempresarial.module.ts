import { Persona } from "../persona/coordinador-persona.module";

export class Jefeempresarial { 
  id: number;
 
  personas:Persona;
  constructor(
    id: number = 0,

    personas:Persona=new Persona()
  ){
    this.id=id;
  
    this.personas=personas
  }
}
