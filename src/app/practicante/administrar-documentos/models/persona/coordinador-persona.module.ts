export class Persona {
  id: number;
  dni: string;
  apellido: string;
  correo_electronico: string;
  direccion: string;
  nacionalidad: string;
  nombre: string;
  sexo: string;
  telefono: string;

  constructor(
      id: number = 0, 
      dni: string = '', 
      apellido: string = '', 
      correo_electronico: string = '', 
      direccion: string = '', 
      nacionalidad: string = '', 
      nombre: string = '',    
      sexo: string = '',      
      telefono: string = ''   
  ) {
      this.id = id;
      this.dni = dni;
      this.apellido = apellido;
      this.correo_electronico = correo_electronico;
      this.direccion = direccion;
      this.nacionalidad = nacionalidad;
      this.nombre = nombre;
      this.sexo = sexo;
      this.telefono = telefono;
  }
}