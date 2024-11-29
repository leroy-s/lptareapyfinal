import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { PracticasService } from '../services/practica.service';
import { TutorService } from '../services/tutor.service';
import { FormsModule } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { AvatarModule } from 'primeng/avatar';
import { DropdownModule } from 'primeng/dropdown';
import { EscuelaLineasService, EscuelaLineas } from '../../secretaria/services/escuela-linea.service'; // Servicio para obtener líneas
import { LineasService } from '../../secretaria/services/LineasServicest.service';
import { Estudiantest } from '../../secretaria/models/Estudiantest';

@Component({
  selector: 'app-coordinador-asignar',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, AvatarModule, DropdownModule],
  templateUrl: './coordinador-asignar.component.html',
  styleUrls: ['./coordinador-asignar.component.css']  // Actualicé a 'styleUrls' en lugar de 'styleUrl'
})
export class CoordinadorAsignarComponent {
  userCareer: string | null = null; // Nombre de la carrera
  period = '2024-1'; // Periodo actual
  searchQuery = ''; // Para búsqueda
  showList = false; // Controla la visibilidad de los contenedores
  selectedItem: any = null; // Ítem seleccionado
  studentList: Estudiantest[] = []; // Lista de estudiantes
  selectedStudent: Estudiantest | null = null; // Estudiante seleccionado
  years: { label: string; value: string | number }[] = []; // Opciones del dropdown (líneas)
  selectedYear: number = 0; // Línea seleccionada (ahora tipo number)
  lineas: { id: number, nombre: string }[] = []; // Datos de líneas
  showTooltip = false;

  constructor(
    private lineasService: LineasService,
    private escuelaLineasService: EscuelaLineasService
  ) {}

  ngOnInit(): void {
    this.getEscuelaLineas(); // Carga las líneas al iniciar el componente
  }

  // Obtiene las líneas asociadas a la carrera
  getEscuelaLineas(): void {
    const carreraId = 1; // ID de la carrera
    this.escuelaLineasService.getEscuelaLineas(carreraId).subscribe(
      (data: EscuelaLineas) => {
        this.userCareer = data.carrera; // Asigna la carrera al estado
        this.populateYears(data.lineasNombres); // Convierte las líneas en opciones para el dropdown
        // Aquí llenamos el array `lineas` con ID y nombre de las líneas
        this.lineas = data.lineasNombres.map((linea: any, index: number) => ({
          id: index + 1, // Asume que los índices son los IDs de las líneas
          nombre: linea
        }));
      },
      (error) => {
        console.error('Error al obtener las líneas:', error);
      }
    );
  }

  // Convierte las líneas en opciones adecuadas para el dropdown
  populateYears(lineasNombres: string[]): void {
    this.years = lineasNombres.map((linea, index) => ({
      label: linea, // Nombre de la línea
      value: index + 1, // ID simulado para la línea
    }));
  }

  // Al seleccionar una línea, carga los estudiantes asociados
  onLineaChange(): void {
    console.log('Línea seleccionada:', this.selectedYear); // Verifica el valor de selectedYear
    if (!this.selectedYear) {
      this.studentList = []; // Si no hay línea seleccionada, limpiamos la lista
      this.showList = false;
      return;
    }

    this.lineasService.getEstudiantesPorLinea(this.selectedYear).subscribe(
      (data: Estudiantest[]) => {
        this.studentList = data;
        this.showList = true; // Mostrar la lista de estudiantes
      },
      (error) => {
        console.error('Error al obtener los estudiantes:', error);
      }
    );
  }

  // Filtrar los estudiantes según el query de búsqueda
  get filteredItems() {
    return this.studentList.filter(estudiante =>
      `${estudiante.nombre} ${estudiante.apellido}`.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Selecciona un estudiante de la lista
  selectItem(estudiante: Estudiantest): void {
    this.selectedStudent = estudiante; // Asigna el estudiante seleccionado
  }

  // Regresa a la vista principal
  onBack(): void {
    this.showList = false;
    this.selectedStudent = null; // Limpia la selección del estudiante
  }
  // Método para verificar si un estudiante está seleccionado
  isSelected(estudiante: any): boolean {
    return this.selectedEstudiantes.includes(estudiante);
  }

  // Método para alternar la selección de un estudiante
  toggleSelection(estudiante: any): void {
    const index = this.selectedEstudiantes.indexOf(estudiante);
    if (index === -1) {
      // Si no está seleccionado, lo agregamos
      this.selectedEstudiantes.push(estudiante);
    } else {
      // Si está seleccionado, lo quitamos
      this.selectedEstudiantes.splice(index, 1);
    }
  }
  // Lista de estudiantes seleccionados
  selectedEstudiantes: any[] = [];
}
