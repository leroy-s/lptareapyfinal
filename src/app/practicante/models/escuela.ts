export class Escuela {
    idEP: number;
    carrera: string;
    idFacultad: number;

    constructor(idEP: number = 0, carrera: string = '', idFacultad: number = 0) {
    this.idEP = idEP;
    this.carrera = carrera;
    this.idFacultad = idFacultad;
    }
}
