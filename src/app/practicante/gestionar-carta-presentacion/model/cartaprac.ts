export interface CartaPresentacion {
    ruc: string;
    razonSocial: string;
    direccion: string;
    descripcion: string;
    nombreArea: string;
    descripcionArea: string;
    nombreRepresentante: string;
    apellidoRepresentante: string;
    cargoRepresentante: string;
    telefonoRepresentante: string;
    correoRepresentante: string;
    nombreLinea:string;
    areaPracticaNombre: string;
    areaPracticaDescripcion: string;
    estado?: string;
}