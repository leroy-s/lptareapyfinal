import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PracticanteEP } from '../models/practicante-ep/coordinador-practicante-ep.module';
import { Documentacion } from '../models/documentacion/coordinador-documentacion.module';
import { PracticasService } from '../services/practica.service';
import { DocumentacionService } from '../services/documentacion.service';
import { PracticanteEPService } from '../services/practicante-ep.service';

@Component({
  selector: 'app-requisitosdedocumentacion',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, AvatarModule],
  templateUrl: './requisitosdedocumentacion.component.html',
  styleUrl: './requisitosdedocumentacion.component.css'
})
export class RequisitosdedocumentacionComponent {
  practicantes: PracticanteEP[] = [];
  practicanteSeleccionado: PracticanteEP | null = null;
  documentos: Documentacion[] = [];
  filteredPracticantes: PracticanteEP[] = [];
  searchQuery: string = '';
  showValidation = false;
  constructor(
    private practicanteEPService: PracticanteEPService,
    private documentacionService: DocumentacionService
  ) {}

  ngOnInit() {
    this.cargarPracticantes();
  }

  cargarPracticantes() {
    this.practicanteEPService.listarPracticantes().subscribe({
      next: (data) => {
        this.practicantes = data;
      },
      error: (err) => {
        console.error('Error al cargar practicantes:', err);
      }
    });
  }

  seleccionarPracticante(practicante: PracticanteEP) {
    this.practicanteSeleccionado = practicante;
    this.cargarDocumentos(practicante.id);
  }

  cargarDocumentos(practicanteId: number) {
    this.documentacionService.listarDocumentos().subscribe({
      next: (data) => {
        // Filtrar documentos por el practicante seleccionado
        this.documentos = data.filter(doc => doc.practica.practicantes_ep.id === practicanteId);
      },
      error: (err) => {
        console.error('Error al cargar documentos:', err);
      }
    });
  }

  validarDocumento(doc: Documentacion) {
    doc.estado = doc.estado === '0' ? '1' : '0'; // Cambiar estado
    this.documentacionService.updateDocumento(doc).subscribe({
      next: () => {
        this.showValidation = true;
      },
      error: (err) => {
        console.error('Error al validar documento:', err);
      }
    });
  } 
  
  filterPracticantes() {
    this.filteredPracticantes = this.practicantes.filter((practicante) =>
      `${practicante.practicantes.personas.nombre} ${practicante.practicantes.personas.apellido}`
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase())
    );
  }
  obtenerIniciales(nombre: string, apellido: string): string {
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
  }
  agregarComentario(doc: Documentacion) {
    alert(`Agregar comentario para el documento: ${doc.tipoDocumento.nombre_doc}`);
  }
}
