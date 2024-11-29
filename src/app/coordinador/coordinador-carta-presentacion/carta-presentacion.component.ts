import { Component, Input } from '@angular/core';
import { Practicas } from '../models/practica/coordinador-practica.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CardModule } from 'primeng/card';
import { PracticasService } from '../services/practica.service';
import {  Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-carta-presentacion',
  standalone: true,
  imports: [ InputTextModule,
    ButtonModule,
    RippleModule,
    CardModule, RouterModule, CommonModule
    ],
  templateUrl: './carta-presentacion.component.html',
  styleUrl: './carta-presentacion.component.css'
})
export class CartaPresentacionComponent {
   selectedPractica: Practicas | null = null;
  missingDataMessage: string = '';

  constructor(private practicasService: PracticasService, private router: Router) {}

  ngOnInit(): void {
    const id = 1; // Por ejemplo, cargamos la práctica con ID 1
    this.loadPractica(id);
  }

  loadPractica(id: number): void {
    this.practicasService.getPracticasById(id).subscribe({
      next: (data: Practicas) => {
        this.selectedPractica = data;

        // Verificar si faltan datos
        if (
          !this.selectedPractica.empresas ||
          !this.selectedPractica.areadepracticas ||
          !this.selectedPractica.lineas
        ) {
          this.missingDataMessage = 'Aún no se ha enviado la carta de presentación.';
        }
      },
      error: (err) => {
        console.error('Error al cargar la práctica:', err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/comienzoppp']);
  }

  reject(): void {
    console.log('Rechazar la carta de presentación...');
    alert('Se ha rechazado la carta de presentación.');
  }

  validate(): void {
    console.log('Validar datos...');
    alert('La carta de presentación ha sido validada.');
  }
}
