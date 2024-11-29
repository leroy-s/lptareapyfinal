import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EscuelaLineasService, EscuelaLineas } from '../services/escuela-linea.service'; // Servicio para obtener líneas
import { DropdownModule } from 'primeng/dropdown'; // Módulo para el dropdown
import { LineasService } from '../services/LineasServicest.service'; // Servicio para obtener estudiantes
import { Estudiantest } from '../models/Estudiantest'; // Modelo del estudiante

@Component({
  selector: 'app-gestion-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, AvatarModule, DropdownModule],
  templateUrl: './gestion-reportes.component.html',
  styleUrls: ['./gestion-reportes.component.css'],
})
export class GestionReportesComponent implements OnInit {
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
    private escuelaLineasService: EscuelaLineasService,
    private lineasService: LineasService // Servicio para obtener estudiantes
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
}