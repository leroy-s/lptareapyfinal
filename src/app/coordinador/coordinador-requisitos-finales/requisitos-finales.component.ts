import { Component } from '@angular/core';
import { Practicas } from '../models/practica/coordinador-practica.module';
import { Router, RouterLink } from '@angular/router';
import { PracticasService } from '../services/practica.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-requisitos-finales',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './requisitos-finales.component.html',
  styleUrl: './requisitos-finales.component.css'
})
export class RequisitosFinalesComponent {
  selectedPractica: Practicas | null = null;
  missingDataMessage: string = '';
  cartaPresentacionEstado: string = 'Cargando...';
  requisitosEstado: string = 'Cargando...';
  tutorEmpresarialEstado: string = 'Sin confirmar';
  semestre: string = '2024-1';
  goBack(): void {
    this.router.navigate(['/comienzoppp']);
  }
  constructor(private practicasService: PracticasService, private router: Router) {}
}
