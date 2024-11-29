import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GestionusuariosService } from './services/gestionusuarios.service';
import { EscuelaService } from '../mantener-facultades/service/escuela.service';
import { FacultadService } from '../mantener-facultades/service/facultad.service';
import { DialogModule } from 'primeng/dialog';
import { ListboxModule } from 'primeng/listbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { AvatarModule } from 'primeng/avatar';
import { Director } from './models/director.model';
import { Facultad } from '../mantener-facultades/models/facultad';
import { Escuela } from '../mantener-facultades/models/escuela';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

interface Role {
  nombre: string;
}

@Component({
  selector: 'app-persona',
  templateUrl: './gestionusuarios.component.html',
  providers: [MessageService],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    ListboxModule,
    DialogModule,
    AvatarModule,     // Add this
    TableModule,      // Add this
    ToastModule,
    /*BrowserAnimationsModule*/
  ],
  styleUrls: ['./gestionusuarios.component.css']
})
export class GestionusuariosComponent implements OnInit {
  searchQuery: string = '';
  visible: boolean = false;
  persona: any = {};
  usuario: any = {};
  usuarios: any[] = [];
  roles: Role[] = [
    { nombre: 'COORDINADOR' },
    { nombre: 'DIRECTOR' },
    { nombre: 'DOCENTE' }
  ];
  selectedRole: string = 'COORDINADOR';
  carreras: any[] = [];
  facultades: any[] = [];
  selectedCarrera: any;
  selectedFacultad: any;
  temporaryUsers: any[] = [];
  carreraDialogVisible = false;
  currentRoleIndex: number = 0;
  currentRole: Role = { nombre: 'COORDINADOR' }; // Aseguramos que siempre tenga un valor inicial
  showList = false;
  // Variables para el control del diálogo de confirmación
  confirmationVisible: boolean = false;
  isConfirmed: boolean = false;

  constructor(
    private messageService: MessageService,
    private gestionusuariosService: GestionusuariosService,
    private escuelaService: EscuelaService,
    private facultadService: FacultadService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No hay sesión activa'
      });
      return;
    }
    this.loadRoles();
    this.cargarFacultades();

  }

  listarUsuarios() {
    this.gestionusuariosService.getUsers().subscribe({
      next: (data) => {
        console.log('Usuarios recibidos:', data);
        this.usuarios = data;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los usuarios'
        });
      }
    });
  }



  showCarreraDialog() {
    this.carreraDialogVisible = true;
  }

  cargarFacultades() {
    console.log('Cargando facultades...');
    this.gestionusuariosService.getFacultades().subscribe({
      next: (data: any) => {
        console.log('Facultades recibidas:', data);
        if (Array.isArray(data)) {
          this.facultades = data;
        } else if (data && typeof data === 'object') {
          // Si la respuesta está en un objeto, ajusta según la estructura
          this.facultades = data.content || data.data || [];
        }

        if (this.facultades.length === 0) {
          this.messageService.add({
            severity: 'info',
            summary: 'Info',
            detail: 'No hay facultades disponibles'
          });
        }
      },
      error: (error) => {
        console.error('Error detallado:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error al cargar facultades: ${error.status} - ${error.statusText}`
        });
      }
    });
  }

  loadCarrerasByFacultad() {
    if (this.selectedFacultad?.id) {
      this.escuelaService.getEscuelasByFacultad(this.selectedFacultad.id).subscribe({
        next: (data: Escuela[]) => {
          console.log('Carreras recibidas:', data);
          this.carreras = data;
        },
        error: (error) => {
          console.error('Error al cargar carreras:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudieron cargar las carreras'
          });
        }
      });
    } else {
      this.carreras = [];
    }
  }

  onFacultadChange(event: any) {
    if (event.value) {
      this.selectedFacultad = event.value;
      this.selectedCarrera = null; // Reset carrera selection
      this.loadCarrerasByFacultad();
    }
  }

  onCarreraChange(event: any) {
    console.log('Carrera seleccionada:', event.value);
    this.selectedCarrera = event.value;
  }

  confirmSelection() {
    if (!this.selectedCarrera) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Por favor, seleccione una carrera'
      });
      return;
    }

    console.log('Confirmando selección:', {
      facultad: this.selectedFacultad,
      carrera: this.selectedCarrera
    });

    this.carreraDialogVisible = false;
    this.cargarRoles(); // Cargar roles después de confirmar la selección


    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: `Carrera seleccionada: ${this.selectedCarrera.carrera}`
    });
  }

  cancelSelection() {
    this.carreraDialogVisible = false;
    this.selectedCarrera = null;
    this.selectedFacultad = null;
    this.carreras = [];
    this.roles = [{ nombre: 'COORDINADOR' }]; // Aseguramos que siempre haya al menos un rol
    this.currentRole = { nombre: 'COORDINADOR' }; // Mantenemos un valor por defecto
  }

  previousRole() {
    this.currentRoleIndex = (this.currentRoleIndex - 1 + this.roles.length) % this.roles.length;
    this.currentRole = this.roles[this.currentRoleIndex];
    this.selectedRole = this.currentRole.nombre;
    this.clearForm();
  }

  nextRole() {
    this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
    this.currentRole = this.roles[this.currentRoleIndex];
    this.selectedRole = this.currentRole.nombre;
    this.clearForm();
  }

  // listarUsuarios() {
  //   this.gestionusuariosService.getUsers().subscribe(
  //     (data) => {
  //       console.log('Usuarios recibidos:', data);
  //       this.usuarios = data;
  //     },
  //     (error) => {
  //       console.error('Error al cargar usuarios:', error);
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: 'Error',
  //         detail: 'No se pudieron cargar los usuarios'
  //       });
  //     }
  //   );
  // }

  addToTemporaryList() {
    if (!this.persona.nombre || !this.persona.apellido) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Por favor, complete los campos requeridos antes de agregar.',
      });
      return;
    }

    this.temporaryUsers.push({ ...this.persona });
    this.persona = {};
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Persona agregada a la lista temporal',
    });
  }

  removeFromTemporaryList(index: number) {
    this.temporaryUsers.splice(index, 1);
    this.messageService.add({
      severity: 'info',
      summary: 'Eliminado',
      detail: 'Persona eliminada de la lista temporal',
    });
  }

  confirmUsers() {
    if (!this.selectedCarrera || !this.currentRole) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Debe seleccionar una carrera y un rol'
      });
      return;
    }
  
    const promises = this.temporaryUsers.map(tempUser => {
      const baseUserData = {
        username: `${tempUser.nombre.toLowerCase().split(' ')[0]}.${tempUser.apellido.toLowerCase().split(' ')[0]}`,
        nombre: tempUser.nombre,
        apellido: tempUser.apellido,
        correoElectronico: tempUser.correo,
        dni: tempUser.dni,
        telefono: tempUser.telefono,
        carreraId: this.selectedCarrera.id
      };
  
      // Diferenciar si es un director u otro rol
      if (this.currentRole.nombre === 'DIRECTOR') {
        const directorData = {
          ...baseUserData,
          firma: tempUser.firma || 'base64-firma',
          sello: tempUser.sello || 'base64-sello'
        };
        return this.gestionusuariosService.signUpDirector(directorData).toPromise();
      } else {
        return this.gestionusuariosService.signUp({
          ...baseUserData,
          roles: [this.currentRole.nombre]
        }).toPromise();
      }
    });
  
    // Ejecutar todas las promesas
    Promise.all(promises)
      .then(responses => {
        console.log('Usuarios creados:', responses);
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: `Se han registrado ${this.temporaryUsers.length} usuarios exitosamente`
        });
        this.temporaryUsers = []; // Limpiar la lista temporal después de confirmación
        // Actualizar la lista de usuarios para reflejar los cambios
        this.listarUsuarios(); // Asegúrate de que esta función cargue los usuarios actuales
      })
      .catch(error => {
        console.error('Error al crear usuarios:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Hubo un error al registrar los usuarios'
        });
      });
  }
  

  handleFileUpload(event: any, type: 'firma' | 'sello') {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (type === 'firma') {
          this.persona.firma = e.target.result.split(',')[1];
        } else {
          this.persona.sello = e.target.result.split(',')[1];
        }
      };
      reader.readAsDataURL(file);
    }
  }

  generateUser() {
    if (this.persona.nombre && this.persona.apellido) {
      const nombre = this.persona.nombre.toLowerCase().split(' ')[0];
      const apellido = this.persona.apellido.toLowerCase().split(' ')[0];
      this.usuario.usuario = `${nombre}.${apellido}`;
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Ingrese nombre y apellido para generar el usuario'
      });
    }
  }


  editarUsuario(usuario: any) {
    // Implementar edición de usuario si es necesario
  }

  eliminarUsuario(id: number) {
    // Implementar eliminación de usuario si es necesario
  }

  loadRoles() {
    // Si los roles vienen del backend, implementarlo aquí
    // Por ahora, usamos los roles definidos localmente
  }

  clearForm() {
    this.persona = {};
    this.usuario = {};
  }

  cargarRoles() {
    // If you want to load roles from a service later, you can implement it here
    // For now, we'll use the static roles defined above
    this.roles = [
      { nombre: 'COORDINADOR' },
      { nombre: 'DIRECTOR' },
      { nombre: 'DOCENTE' }
    ];
    this.currentRole = this.roles[this.currentRoleIndex];
    this.selectedRole = this.currentRole.nombre;
  }
  onBack() {
    this.showList = false;
  }
  confirmDialogVisible: boolean = false;

  onConfirmDialog() {
    // Lógica para confirmar la acción
    this.confirmDialogVisible = false;  // Cierra la subventana
  }

  onCancelDialog() {
    this.confirmDialogVisible = false;  // Cierra la subventana sin realizar ninguna acción
  }
  openConfirmDialog() {
    if (this.currentRole.nombre === 'DIRECTOR') {
      this.confirmDialogVisible = true;  // Muestra la subventana si es el director
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Acción no permitida',
        detail: 'Solo el Director puede confirmar esta acción.'
      });
    }
  }
  

  
}
