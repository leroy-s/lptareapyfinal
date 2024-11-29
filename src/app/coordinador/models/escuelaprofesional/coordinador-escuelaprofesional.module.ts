import { Facultad } from "../facultad/coordinador-facultad.module";

export class EscuelaProfesional {
  id: number;
  carrera: string;
  facultades: Facultad |null;

  constructor(id: number = 0, carrera: string = '', facultades: Facultad = new Facultad()) {
  this.id = id;
  this.carrera = carrera;
  this.facultades = facultades;
  }
}