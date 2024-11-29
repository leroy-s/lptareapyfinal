import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { RouterLink, RouterModule } from '@angular/router';
import { ComienzopppComponent } from '../coordinador-comienzoppp/comienzoppp.component'; 
import { RequisitosdedocumentacionComponent } from '../requisitosdedocumentacion/requisitosdedocumentacion.component';
import { SeguimientodeusuarioComponent } from '../coordinador-seguimientodeusuario/seguimientodeusuario.component';
import { SidebarcoordinadorComponent } from '../sidebarcoordinador/sidebarcoordinador.component';

@Component({
  selector: 'app-validacion',
  standalone: true,
  imports: [ComienzopppComponent,RequisitosdedocumentacionComponent,SeguimientodeusuarioComponent,RouterModule,CommonModule, FormsModule, ButtonModule, InputTextModule, AvatarModule],
  templateUrl: './validacion.component.html',
  styleUrl: './validacion.component.css'
})
export class ValidacionComponent {
  currentView: string = 'comienzoppp'; // Vista inicial predeterminada

  setView(view: string): void {
    this.currentView = view; // Cambia la vista actual
  }
  
}
