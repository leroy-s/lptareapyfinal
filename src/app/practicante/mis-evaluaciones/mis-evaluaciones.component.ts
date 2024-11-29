import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-mis-evaluaciones',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    AvatarModule,
    DropdownModule,
    DialogModule,
  ],
  templateUrl: './mis-evaluaciones.component.html',
  styleUrls: ['./mis-evaluaciones.component.css'],
})
export class MisEvaluacionesComponent {
  showList = false;
  selectedItem: any = null; // Variable para almacenar el ítem seleccionado

  years: { label: string; value: string }[] = [
    { label: '2023', value: '2023' },
    { label: '2024', value: '2024' },
    { label: '2025', value: '2025' },
  ]; // Opciones para el dropdown

  selectedYear: string = '2024'; // Año seleccionado por defecto
  displayRubric: boolean = false; // Control de visibilidad del modal
  activeTab: string = 'tareas'; // Define la pestaña activa por defecto

  onBack() {
    this.showList = false;
    this.selectedItem = null; // Reinicia la selección al regresar
  }

  showRubricDialog() {
    this.displayRubric = true;
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
