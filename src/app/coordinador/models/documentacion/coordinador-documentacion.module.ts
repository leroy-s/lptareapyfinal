import { Practicas } from "../practica/coordinador-practica.module";
import { Tipo_Documento } from "../tipodocumento/coordinador-tipodocumento.module"; 

export class Documentacion {
    id: number;
    estado: string;
    fechaGenerada: Date; // CamelCase
    archivo: Blob | null; // Para manejar el archivo binario (opcional)
    tipoDocumento: Tipo_Documento; // Asociación con TipoDocumento
    practica: Practicas; // Relación opcional con prácticas (si aplica)

    constructor(
        id: number = 0,
        estado: string = '',
        fechaGenerada: Date = new Date(),
        archivo: Blob | null = null, // Inicializado como null
        tipoDocumento: Tipo_Documento = new Tipo_Documento(),
        practica: Practicas=new Practicas()
    ) {
        this.id = id;
        this.estado = estado;
        this.fechaGenerada = fechaGenerada;
        this.archivo = archivo;
        this.tipoDocumento = tipoDocumento;
        this.practica = practica;
    }
}
