import { Component } from '@angular/core';
import { SidebarcoordinadorComponent } from './sidebarcoordinador/sidebarcoordinador.component';
import { RedireccionamientoComponent } from './coordinador-redireccionamiento/redireccionamiento.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-coordinador',
  standalone: true,
  imports:  [RouterOutlet,SidebarcoordinadorComponent, FormsModule, RedireccionamientoComponent, CommonModule],
  templateUrl: './coordinador.component.html',
  styleUrl: './coordinador.component.css'
})
export class CoordinadorComponent {
  title = 'app-clovalpy';
  isRedirected = false;
  redirectToSidebarcoordinador() {
    this.isRedirected = true;
  }
}
