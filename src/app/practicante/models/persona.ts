export class Persona {
    id: number;
    dni: string;
    apellido: string;
    correo: string;
    direccion: string;
    nacionalidad: string;
    nombre: string;
    sexo: string;
    telefono: string;

    constructor(
        id: number = 0, 
        dni: string = '', 
        apellido: string = '', 
        correo: string = '', 
        direccion: string = '', 
        nacionalidad: string = '', 
        nombre: string = '',    // Valor predeterminado añadido
        sexo: string = '',       // Valor predeterminado añadido
        telefono: string = ''    // Valor predeterminado añadido
    ) {
        this.id = id;
        this.dni = dni;
        this.apellido = apellido;
        this.correo = correo;
        this.direccion = direccion;
        this.nacionalidad = nacionalidad;
        this.nombre = nombre;
        this.sexo = sexo;
        this.telefono = telefono;
    }
}
