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
import { SidebarComponent } from './sidebar/sidebar.component';
import { RedireccionamientoComponent } from './redireccionamiento/redireccionamiento.component';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
     FormsModule,
      RedireccionamientoComponent,
       CommonModule
  ],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent {
  title = 'app-clovalpy';
  isRedirected = false; // Controla si mostrar el sidebar o la vista de redireccionamiento

  // Método para cambiar el estado a redireccionado
  redirectToSidebar() {
    this.isRedirected = true;
  }
}
