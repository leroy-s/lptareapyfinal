import { Campus } from "../campus/coordinador-campus.module";

export class Facultad {
  id: number;
  facultad: string;
 campus: Campus;

  constructor(id: number = 0, facultad: string = '', campus: Campus = new Campus()) {
    this.id = id;
    this.facultad = facultad;
    this.campus = campus;
  }
}
