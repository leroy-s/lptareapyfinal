import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { LineasService } from '../services/LineasServicest.service'; // Importa el servicio para obtener estudiantes
import { Estudiantest } from '../models/Estudiantest'; // Modelo del estudiante
import { CommonModule } from '@angular/common'; // Asegúrate de que esté importado
import { EscuelaLineasService } from '../services/escuela-linea.service';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-gestion-de-cartas',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, AvatarModule, DropdownModule],
  templateUrl: './gestion-de-cartas.component.html',
  styleUrls: ['./gestion-de-cartas.component.css'],
})
export class GestionDeCartasComponent implements OnInit {
  userCareer: string | null = null;
  period = '2024-1';
  showList = false;
  searchQuery = '';
  lineas: { id: number, nombre: string }[] = [];  // Se asegura de que los datos de líneas estén presentes
  estudiantes: Estudiantest[] = [];  // Lista de estudiantes obtenida de la API
  selectedLinea: number | null = null;  // ID de la línea seleccionada
  selectedStudent: Estudiantest | null = null;  // Aquí agregamos la propiedad selectedStudent
  showTooltip = false;

  constructor(
    private lineasService: LineasService,
    private escuelaLineasService: EscuelaLineasService
  ) {}

  ngOnInit() {
    this.getEscuelaLineas(); // Obtener las líneas de la carrera
  }

  // Método para obtener las líneas de la carrera
  getEscuelaLineas(): void {
    const carreraId = 1;
    this.lineasService.getEscuelaLineas(carreraId).subscribe(
      (data: any) => {
        this.userCareer = data.carrera;
        this.lineas = data.lineasNombres.map((linea: any) => ({
          id: linea.id,
          nombre: linea.nombre,
        }));
      },
      (error) => {
        console.error('Error al obtener las líneas:', error);
      }
    );
  }
  
  // Muestra la lista de estudiantes para la línea seleccionada
  showListView(lineaId: number): void {
    this.selectedLinea = lineaId;
    this.showList = true;
    this.lineasService.getEstudiantesPorLinea(lineaId).subscribe(
      (data: Estudiantest[]) => {
        this.estudiantes = data;  // Asigna los estudiantes obtenidos
      },
      (error) => {
        console.error('Error al obtener los estudiantes:', error);
      }
    );
  }

  // Método para filtrar estudiantes
  get filteredItems() {
    return this.estudiantes.filter(estudiante =>
      `${estudiante.nombre} ${estudiante.apellido}`.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Regresar a la vista de selección de línea
  onBack() {
    this.showList = false;
    this.selectedLinea = null;
    this.estudiantes = [];
  }

  // Seleccionar un estudiante de la lista
  selectItem(item: Estudiantest) {
    this.selectedStudent = item; // Asigna el estudiante seleccionado
  }

  // Control para mostrar el tooltip cuando el contenedor está vacío
  onEmptyContainerMouseEnter() {
    if (!this.selectedStudent) {
      this.showTooltip = true; // Muestra el tooltip si no hay estudiante seleccionado
    }
  }

  // Control para ocultar el tooltip cuando el mouse sale del contenedor vacío
  onEmptyContainerMouseLeave() {
    this.showTooltip = false; // Oculta el tooltip
  }
}