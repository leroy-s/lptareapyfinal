import { CommonModule } from "@angular/common";
import { CartaPresentacionComponent } from "../coordinador-carta-presentacion/carta-presentacion.component"; 
import { RequisitosFinalesComponent } from "../coordinador-requisitos-finales/requisitos-finales.component";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { AvatarModule } from "primeng/avatar";
import { SidebarcoordinadorComponent } from "../sidebarcoordinador/sidebarcoordinador.component";
import { RouterLink } from "@angular/router";
import { PracticanteEP } from "../models/practicante-ep/coordinador-practicante-ep.module";
import { Practicas } from "../models/practica/coordinador-practica.module";
import { Component } from "@angular/core";

@Component({
  selector: 'app-comienzoppp',
  standalone: true,
  imports: [RequisitosFinalesComponent,CommonModule, FormsModule, ButtonModule, InputTextModule, AvatarModule, CartaPresentacionComponent],
  templateUrl: './comienzoppp.component.html',
  styleUrl: './comienzoppp.component.css'
})
export class ComienzopppComponent {
  practicantes: PracticanteEP[] = [];
  filteredPracticantes: PracticanteEP[] = [];
  selectedPracticante: PracticanteEP | null = null;
  searchQuery: string = '';
  selectedPractica: Practicas | null = null;
  cartaPresentacionEstado: string = 'Cargando...';
  requisitosEstado: string = 'Cargando...';
  tutorEmpresarialEstado: string = 'Sin confirmar';
  semestre: string = '2024-1';
  currentView: string | null = null; // Permite que currentView sea 'string' o 'null'


  setView(view: string| null): void {
    this.currentView = view; // Cambia la vista actual
  }
  constructor() {}

  ngOnInit(): void {
    // Datos simulados
    this.practicantes = [
      {
        id: 1,
        escuelasprofesionales: { id: 1, carrera: 'Ingeniería de Sistemas', facultades: null },
        practicantes: {
          id: 1,
          año_estudio: '2024',
          personas: {
            id: 1,
            nombre: 'Juan',
            apellido: 'Pérez',
            correo_electronico: 'juan.perez@example.com',
            direccion: 'Calle Falsa 123',
            dni: '12345678',
            nacionalidad: 'Peruana',
            sexo: 'M',
            telefono: '987654321'
          }
        },
        semestre: '2024-1'
      },
      {
        id: 2,
        escuelasprofesionales: { id: 2, carrera: 'Derecho', facultades: null },
        practicantes: {
          id: 2,
          año_estudio: '2023',
          personas: {
            id: 2,
            nombre: 'Ana',
            apellido: 'Gómez',
            correo_electronico: 'ana.gomez@example.com',
            direccion: 'Av. Principal 456',
            dni: '87654321',
            nacionalidad: 'Peruana',
            sexo: 'F',
            telefono: '987654322'
          }
        },
        semestre: '2023-2'
      }
    ];

    // Inicializar los datos filtrados
    this.filteredPracticantes = this.practicantes;
  }

  filterPracticantes() {
    this.filteredPracticantes = this.practicantes.filter((practicante) =>
      `${practicante.practicantes.personas.nombre} ${practicante.practicantes.personas.apellido}`
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase())
    );
  }

  selectPracticante(practicante: PracticanteEP) {
    this.selectedPracticante = practicante;

    this.cartaPresentacionEstado = 'Validación de empresa';
    this.requisitosEstado = 'Sin fecha';
    this.tutorEmpresarialEstado = 'Sin confirmar';
  }

}
