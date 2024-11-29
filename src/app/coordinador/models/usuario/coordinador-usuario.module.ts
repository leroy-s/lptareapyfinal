import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Persona } from '../persona/coordinador-persona.module';




export class Usuario{  
  id: number;
  usuario: string;
  password: string;
  persona: Persona;
  Estado: string;
  icono: string;

  constructor(
    id: number=0,
    usuario: string='',
    password: string='',
    persona: Persona=new Persona(),
    Estado: string='',
    icono: string=''
  ) {
    this.id = id;
    this.usuario = usuario;
    this.password = password;
    this.persona = persona;
    this.Estado = Estado;
    this.icono = icono;
  }}
