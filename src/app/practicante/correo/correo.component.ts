import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-correo',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, AvatarModule,DropdownModule],
  templateUrl: './correo.component.html',
  styleUrl: './correo.component.css'
})
export class CorreoComponent {
  showList = false;
  selectedItem: any = null; // Variable para almacenar el ítem seleccionado

  
  onBack() {
    this.showList = false;
    this.selectedItem = null; // Reinicia la selección al regresar
  }

  years: { label: string; value: string }[] = [
    { label: '2023', value: '2023' },
    { label: '2024', value: '2024' },
    { label: '2025', value: '2025' },
  ]; // Opciones para el dropdown

  selectedYear: string = '2024'; // Año seleccionado por defecto
}
