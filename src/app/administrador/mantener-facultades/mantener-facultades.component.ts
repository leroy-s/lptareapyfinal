import { EscuelaService } from './service/escuela.service';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Campus } from './models/campus';
import { Facultad } from './models/facultad';
import { Escuela } from './models/escuela';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FacultadService } from './service/facultad.service';
import { CampusService } from './service/campus.service';
import { ToastModule } from 'primeng/toast';
import { Observable } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { catchError } from 'rxjs/operators';
import { DropdownModule } from 'primeng/dropdown';  // Importa el módulo de Dropdown

@Component({
  selector: 'app-mantener-facultades',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    TableModule,
    DialogModule,
    ToastModule,
    InputTextModule,DropdownModule
  ],
  providers: [MessageService],
  templateUrl: './mantener-facultades.component.html',
  styleUrls: ['./mantener-facultades.component.css']
})
export class MantenerFacultadesComponent implements OnInit {
  campusList: Campus[] = [];
  facultades: Facultad[] = [];
  escuelas: Escuela[] = [];

  selectedCampusId?: number;
  selectedFacultadId?: number;
  selectedEscuelaId?: number;

  displayDialog = false;
  newItem: any = {};
  dialogMode: 'campus' | 'facultad' | 'escuela' = 'campus';
  showList = false;

  constructor(
    private campusService: CampusService,
    private facultadService: FacultadService,
    private escuelaService: EscuelaService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadCampus(); // Cargar campus al inicio
  }
  // Método para editar una escuela
editEscuela(escuela: Escuela) {
  this.dialogMode = 'escuela';  // Establecer el modo de diálogo a "escuela"
  this.newItem = { ...escuela };  // Clonar los datos de la escuela seleccionada
  this.displayDialog = true;  // Mostrar el cuadro de diálogo
}

// Guardar cambios de la escuela editada
saveEditedItem() {
  if (!this.validateNewItem()) {
    return;
  }

  this.escuelaService.updateEscuela(this.newItem.id, this.newItem).subscribe({
    next: () => {
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Escuela editada correctamente'
      });
      this.displayDialog = false;
      this.refreshCurrentView();
    },
    error: (error) => {
      console.error(error);
      this.showError('Error al editar la escuela');
    }
  });
}
// Método para eliminar una escuela
deleteEscuela(escuelaId: number) {
  if (confirm('¿Estás seguro de que deseas eliminar esta escuela?')) {
    this.escuelaService.deleteEscuela(escuelaId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Escuela eliminada correctamente'
        });
        this.refreshCurrentView();  // Actualizar la vista después de eliminar
      },
      error: (error) => {
        console.error(error);
        this.showError('Error al eliminar la escuela');
      }
    });
  }
}


  // Cargar lista de campus
  loadCampus() {
    this.campusService.getCampus().subscribe({
      next: (data: Campus[]) => (this.campusList = data),
      error: (error: any) => this.showError('Error al cargar campus')
    });
  }
  onBack() {
    this.showList = false;
  }
  onCampusChange(event: any) {
    this.selectedCampusId = event.value;
    this.selectedFacultadId = undefined;  // Reiniciar facultad seleccionada
    this.facultades = []; // Limpiar facultades
    this.escuelas = [];  // Limpiar escuelas
  
    // Validar que selectedCampusId no es undefined
    if (this.selectedCampusId) {
      this.loadFacultades(this.selectedCampusId); // Cargar facultades para el campus seleccionado
    } else {
      this.showError("Debe seleccionar un campus.");
    }
  }
  
  onFacultadChange(event: any) {
    this.selectedFacultadId = event.value;
    this.escuelas = [];  // Limpiar escuelas
  
    // Validar que selectedFacultadId no es undefined
    if (this.selectedFacultadId) {
      this.loadEscuelas(this.selectedFacultadId); // Cargar escuelas para la facultad seleccionada
    } else {
      this.showError("Debe seleccionar una facultad.");
    }
  }
  // Método para verificar si el usuario está autenticado
private verifyAuthentication(): boolean {
  const token = localStorage.getItem('token');
  if (!token) {
    this.showError('No hay sesión activa. Por favor, inicie sesión nuevamente.');
    return false; // Si no hay token, se retorna false
  }
  return true; // Si hay token, la autenticación es válida
}

  

  // Cargar facultades para el campus seleccionado
  loadFacultades(campusId: number) {
    if (!this.verifyAuthentication()) return;

    this.facultadService.getFacultadesByCampus(campusId).subscribe({
      next: (data) => {
        console.log('Facultades cargadas:', data); // Para debugging
        this.facultades = data;
      },
      error: (error) => {
        console.error('Error detallado:', error);
        if (error.status === 403) {
          this.showError('Sesión expirada o sin autorización. Por favor, inicie sesión nuevamente.');
        } else {
          this.showError('Error al cargar facultades: ' + error.message);
        }
      }
    });
  }


  // Cargar escuelas para la facultad seleccionada
  loadEscuelas(facultadId: number) {
    this.escuelaService.getEscuelasByFacultad(facultadId).subscribe({
      next: (data) => (this.escuelas = data),
      error: () => this.showError('Error al cargar escuelas')
    });
  }

  // Mostrar cuadro de diálogo para crear nuevo campus, facultad o escuela
  showCreateDialog(type: 'campus' | 'facultad' | 'escuela') {
    this.dialogMode = type;
    this.newItem = {};  // Resetear los datos del nuevo ítem
    this.displayDialog = true;
  }

  // Guardar nuevo ítem (campus, facultad o escuela)
  saveNewItem() {
    if (!this.validateNewItem()) {
      return;
    }

    let request: Observable<Campus | Facultad | Escuela>;

    switch (this.dialogMode) {
      case 'campus':
        request = this.campusService.createCampus(this.newItem);
        break;
      case 'facultad':
        if (!this.selectedCampusId) {
          this.showError('Debe seleccionar un campus');
          return;
        }
        this.newItem.idCampus = this.selectedCampusId;
        request = this.facultadService.createFacultad(this.newItem);
        break;
      case 'escuela':
        if (!this.selectedFacultadId) {
          this.showError('Debe seleccionar una facultad');
          return;
        }
        this.newItem.idFacultad = this.selectedFacultadId;
        request = this.escuelaService.createEscuela(this.newItem);
        break;
      default:
        return;
    }

    request.subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: `${this.dialogMode} creado correctamente`
        });
        this.displayDialog = false;
        this.refreshCurrentView();
      },
      error: (error) => {
        console.error(error);
        this.showError(`Error al crear ${this.dialogMode}`);
      }
    });
  }

  // Validar los campos requeridos para cada tipo de ítem
  private validateNewItem(): boolean {
    const requiredField = this.dialogMode === 'campus' ? 'sede' :
                         this.dialogMode === 'facultad' ? 'nombre' :
                         'carrera';

    if (!this.newItem[requiredField]) {
      this.showError(`El campo ${requiredField} es requerido`);
      return false;
    }
    return true;
  }

  // Actualizar la vista después de crear un nuevo ítem
  private refreshCurrentView() {
    switch (this.dialogMode) {
      case 'campus':
        this.loadCampus();
        break;
      case 'facultad':
        if (this.selectedCampusId) {
          this.loadFacultades(this.selectedCampusId);
        }
        break;
      case 'escuela':
        if (this.selectedFacultadId) {
          this.loadEscuelas(this.selectedFacultadId);
        }
        break;
    }
  }
  

  // Mostrar mensaje de error
  private showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 5000
    });
  }
}
