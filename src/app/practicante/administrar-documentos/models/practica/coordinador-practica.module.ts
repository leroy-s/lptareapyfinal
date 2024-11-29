import { Areadepractica } from "../areadepractica/coordinador-areadepractica.module";
import { Empresa } from "../empresa/coordinador-empresa.module";

import { Linea } from "../linea/coordinador-linea.module";
import { Persona } from "../persona/coordinador-persona.module";
import { PracticanteEP } from "../practicante-ep/coordinador-practicante-ep.module";
import { Tutor } from "../tutor/coordinador-tutor.module";

export class Practicas {
    id:number;
    estado:string;
    fecha_fin:Date;
    fecha_inicio:Date;
    horas:number;
modalidad:string;
areadepracticas:Areadepractica |null;
empresas:Empresa|null;
personas:Persona|null;
lineas:Linea|null;
practicantes_ep:PracticanteEP;
tutores:Tutor;
constructor(id:number=0,
    estado:string='',
    fecha_fin:Date= new Date(),
    fecha_inicio:Date= new Date(),
    horas:number=0,
modalidad:string='',
areadepracticas:Areadepractica=new Areadepractica(),
empresas:Empresa=new Empresa(),
personas:Persona=new Persona(),
lineas:Linea=new Linea(),
practicantes_ep:PracticanteEP=new PracticanteEP(),
tutores:Tutor= new Tutor){
this.id=id;
this.estado=estado;
this.fecha_fin=fecha_fin;
this.fecha_inicio=fecha_inicio;
this.horas=horas;
this.modalidad=modalidad;
this.areadepracticas=areadepracticas;
this.empresas=empresas;
this.personas=personas;
this.lineas=lineas;
this.practicantes_ep=practicantes_ep;
this.tutores=tutores;
}
 }
