
export class Tipo_Documento {
  id:number;
  estado:string;
  nombre_doc:string;
  plantilla:string;
  constructor(id:number=0,
    estado:string='',
    nombre_doc:string='',
    plantilla:string=''){
      this.id=id;
      this.estado=estado;
      this.nombre_doc=nombre_doc;
      this.plantilla=plantilla;
    }
 }
