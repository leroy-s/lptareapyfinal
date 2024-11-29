import { RoleAssignment } from './models/RoleAssignment';
import { EscuelaService } from './../mantener-facultades/service/escuela.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ListboxModule } from 'primeng/listbox';
import { FacultadService } from '../mantener-facultades/service/facultad.service';

import { MessageService } from 'primeng/api';
import { RoleAssignmentService } from './services/roleAssignment.service';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SharedModule } from 'primeng/api';
import { RoleAssignmentView } from './models/RoleAssignmentView';

@Component({
  selector: 'app-mantener-elementos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
    ListboxModule,
    InputTextModule,
    ToastModule,
    CheckboxModule,
    TableModule,
    TagModule,
    SharedModule
  ],
  providers: [MessageService,
    RoleAssignmentService,
    FacultadService,
    EscuelaService],  // Añadir esto
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Agregar esto
  templateUrl: './mantener-elementos.component.html',
  styleUrl: './mantener-elementos.component.css'
})
export class MantenerElementosComponent implements OnInit {
  @ViewChild('dt') dt!: Table;  // Usar el operador de aserción definitiva !
  facultades: any[] = [];
  escuelas: any[] = [];
  roleAssignments: RoleAssignmentView[] = [];

  roleForm = {
    roleEnum: '',
    facultadId: null as number | null,
    escuelaId: null as number | null,
    permissions: new Set<string>()
  };

  // Lista actualizada de permisos disponibles
  availablePermissions = [
    { name: 'GESTIONAR CURSOS', selected: false },
    { name: 'VER ESTUDIANTES', selected: false },
    { name: 'VALIDAR EMPRESA', selected: false },
    { name: 'VER ESTADISTICA', selected: false },
    { name: 'ACEPTAR CARTE P', selected: false },
    { name: 'CREAR PLANTILLA', selected: false },
    { name: 'CREAR PPP', selected: false },
    { name: 'GESTIÓN DE CARTAS', selected: false },
    { name: 'GESTIÓN DE REPORTES', selected: false },
    { name: 'CREAR CAMPUS', selected: false },
    { name: 'LISTAR CAMPUS', selected: false },
    { name: 'CREAR FACULTAD', selected: false },
    { name: 'CREAR ESCUELA', selected: false }
  ];

  constructor(
    private roleService: RoleAssignmentService,
    private messageService: MessageService,
    private facultadService: FacultadService,
    private escuelaService: EscuelaService

  ) {}

  ngOnInit() {

    this.loadFacultades();
    this.loadRoleAssignments();
  }

  loadFacultades() {
    this.roleService.getFacultades().subscribe({
      next: (data) => {
        this.facultades = data;
        console.log('Facultades cargadas:', data);
      },
      error: (error) => {
        console.error('Error al cargar facultades:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar facultades'
        });
      }
    });
  }

  loadRoleAssignments(): void {
    this.roleService.getAllRoleAssignments().subscribe({
      next: (data: RoleAssignmentView[]) => {
        console.log('Assignments loaded:', data); // Para debugging
        this.roleAssignments = data;
      },
      error: (error: unknown) => {
        console.error('Error loading assignments:', error); // Para debugging
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar las asignaciones'
        });
      }
    });
  }

  onFacultadChange(event: any) {
    console.log('Facultad seleccionada:', event.value); // Debug
    if (event.value) {
      this.roleService.getEscuelasByFacultad(event.value).subscribe({
        next: (data) => {
          this.escuelas = data;
          console.log('Escuelas cargadas:', data);
        },
        error: (error) => {
          console.error('Error al cargar escuelas:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al cargar escuelas'
          });
        }
      });
    } else {
      this.escuelas = [];
      this.roleForm.escuelaId = null;
    }
  }

  onPermissionChange(permission: string, isSelected: boolean) {
    if (isSelected) {
      this.roleForm.permissions.add(permission);
    } else {
      this.roleForm.permissions.delete(permission);
    }
  }

  assignRole() {
    if (!this.roleForm.roleEnum.trim) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debe ingresar un rol válido'
      });
      return;
    }

    if (typeof this.roleForm.facultadId !== 'number' || typeof this.roleForm.escuelaId !== 'number') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Facultad y Escuela deben ser valores numéricos válidos'
      });
      return;
    }

    if (this.roleForm.permissions.size === 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debe seleccionar al menos un permiso'
      });
      return;
    }

    console.log('Form data before sending:', this.roleForm); // Para debugging

    const roleAssignment: RoleAssignment = {
      roleEnum: this.roleForm.roleEnum.toUpperCase(), // Asegurarse de que esté en mayúsculas
      facultadId: Number(this.roleForm.facultadId),
      escuelaId: Number(this.roleForm.escuelaId),
      permissions: this.roleForm.permissions
    };

    this.roleService.assignRole(roleAssignment).subscribe({
      next: (response) => {
        console.log('Response:', response); // Para debugging
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Permisos asignados correctamente'
        });
        this.clearForm();
        this.loadRoleAssignments(); // Recargar la tabla después de asignar
      },
      error: (error) => {
        console.error('Error completo:', error); // Para debugging
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error?.message || 'Error al asignar permisos'
        });
      }
    });
  }

  clearForm() {
    this.roleForm = {
      roleEnum: '',
      facultadId: null,
      escuelaId: null,
      permissions: new Set<string>()
    };
    this.availablePermissions.forEach(p => p.selected = false);
  }

  editAssignment(assignment: RoleAssignmentView) {
    // Implementar lógica de edición
    console.log('Editar:', assignment);
  }

  deleteAssignment(assignment: RoleAssignmentView) {
    // Implementar lógica de eliminación
    console.log('Eliminar:', assignment);
  }

  // Método auxiliar para el filtrado global
  onGlobalFilter(event: Event) {
    const element = event.target as HTMLInputElement;
    if (this.dt) {
      this.dt.filterGlobal(element.value, 'contains');
    }
  }












}
