// campus.model.ts
export class Campus {
    idCampus: number;
    sede: string;

    constructor(idCampus: number = 0, sede: string = '') {
        this.idCampus = idCampus;
        this.sede = sede;
    }
    }
