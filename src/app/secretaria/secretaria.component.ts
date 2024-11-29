import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { StyleClassModule } from 'primeng/styleclass';
import { SidebarsecretariaComponent } from './sidebarsecretaria/sidebarsecretaria.component';
import { RedireccionamientoComponent } from './redireccionamiento/redireccionamiento.component';
import { SidebarComponent } from '../administrador/sidebar/sidebar.component';

@Component({
  selector: 'app-secretaria',
  standalone: true,
  imports: [RouterOutlet,SidebarsecretariaComponent,FormsModule,RedireccionamientoComponent,CommonModule],
  templateUrl: './secretaria.component.html',
  styleUrl: './secretaria.component.css'
})
export class SecretariaComponent {

  title = 'app-clovalpy';
  isRedirected = false; // Controla si mostrar el sidebar o la vista de redireccionamiento

  // Método para cambiar el estado a redireccionado
  redirectToSidebarsecretaria() {
    this.isRedirected = true;
  }
}
