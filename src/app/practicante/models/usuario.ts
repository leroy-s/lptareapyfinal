import { Persona } from "../models/persona";
import { FormsModule } from '@angular/forms';

export class Usuario {
    id!:number;
    clave!:string;
    estado!:string;
    usuario!:string;
    persona!:Persona;

    constructor(id: number = 0, clave:string = '', estado:string = '', usuario:string = '', persona: Persona = new Persona()) {
        this.id = id;
        this.clave = clave;
        this.estado = estado;
        this.usuario = usuario;  
        this.persona = persona;// Asigna un objeto Especialidad
    }
}
export class AppModule {}