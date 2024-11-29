import { Component } from '@angular/core';
import { SidebarpracticanteComponent } from "./sidebarpracticante/sidebarpracticante.component";
import { RedireccionamientoComponent } from "./redireccionamiento/redireccionamiento.component";
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-practicante',
  standalone: true,
  imports: [SidebarpracticanteComponent, RedireccionamientoComponent,RouterOutlet,FormsModule,
    RedireccionamientoComponent,
    CommonModule],
  templateUrl: './practicante.component.html',
  styleUrl: './practicante.component.css'
})
export class PracticanteComponent {
  title = 'app-clovalpy';
  isRedirected = false; // Controla si mostrar el sidebar o la vista de redireccionamiento

  // Método para cambiar el estado a redireccionado
  redirectToSidebarpracticante() {
    this.isRedirected = true;
  }
}
