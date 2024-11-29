import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { PersonpracService } from './service/personprac.service';
import { CartaPresentacion } from './model/cartaprac';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-gestionar-carta-presentacion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    AvatarModule,
    DropdownModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './gestionar-carta-presentacion.component.html',
  styleUrl: './gestionar-carta-presentacion.component.css',
})
export class GestionarCartaPresentacionComponent implements OnInit {
  carta: CartaPresentacion = {
    ruc: '',
    razonSocial: '',
    direccion: '',
    descripcion: '',
    nombreArea: '',
    descripcionArea: '',
    nombreRepresentante: '',
    apellidoRepresentante: '',
    cargoRepresentante: '',
    telefonoRepresentante: '',
    correoRepresentante: '',
    nombreLinea: '',
    areaPracticaNombre: '',  // Propiedad añadida
    areaPracticaDescripcion: ''  // Propiedad añadida
  };
  

  cartaGuardada?: CartaPresentacion;
  loading: boolean = false;
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(private cartaService: PersonpracService) {}

  ngOnInit() {
    this.obtenerCarta();
  }

  obtenerCarta(): void {
    this.loading = true;
    this.cartaService.obtenerCarta().subscribe({
      next: (data: CartaPresentacion) => {
        this.cartaGuardada = data;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error al obtener carta', error);
        this.loading = false;
      }
    });
  }

  solicitarValidacion(): void {
    this.loading = true;
    this.mensajeError = '';
    this.mensajeExito = '';
    console.log(this.carta);
    this.cartaService.comenzarCarta(this.carta).subscribe({
      next: (response: CartaPresentacion) => {
        this.mensajeExito = 'Carta enviada exitosamente';
        this.obtenerCarta();
        this.loading = false;
      },
      error: (error: any) => {
        this.mensajeError = 'Error al enviar la carta';
        console.error('Error al enviar la carta', error);
        this.loading = false;
      }
    });
  }

  showList = false;
  selectedItem: any = null;

  onBack() {
    this.showList = false;
    this.selectedItem = null;
  }

  years: { label: string; value: string }[] = [
    { label: '2023', value: '2023' },
    { label: '2024', value: '2024' },
    { label: '2025', value: '2025' },
  ];

  selectedYear: string = '2024';

  cartas = [
    { fecha: '23/06/2024', nombre: 'BCP', linea: 'SOFTWARE' },
    { fecha: '23/06/2024', nombre: 'BCP', linea: 'SOFTWARE' },
  ];

  formularioVisible: boolean = false;

  // Otros datos y métodos aquí
  // ...

  // Método para mostrar el formulario
  comenzarPracticas() {
    this.formularioVisible = true;
  }
}
