import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PracticanteEPService } from '../services/practicante-ep.service'; 
import { Usuario } from '../models/usuario/coordinador-usuario.module';
import { PracticanteEP } from '../models/practicante-ep/coordinador-practicante-ep.module'; 
import { RouterLink, RouterModule } from '@angular/router';

import { Persona } from '../models/persona/coordinador-persona.module'; 
import { PersonaService } from '../services/persona.service';
import { UsuarioService } from '../services/usuario.service'; 

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { ListboxModule } from 'primeng/listbox';
import { TableModule } from 'primeng/table';
import { PracticanteService } from '../services/practicante.service'; 
import { TutorService } from '../services/tutor.service';  
import { Tutor } from '../models/tutor/coordinador-tutor.module'; 
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import { SidebarcoordinadorComponent } from '../sidebarcoordinador/sidebarcoordinador.component';
@Component({
  
  selector: 'app-practicante-ep',
  standalone: true,
  imports: [CommonModule,
    
    RouterModule,
    
    FormsModule,
    CardModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    MessageModule,
    DropdownModule,
    AvatarModule,
    ListboxModule],
  templateUrl: './practicante-ep.component.html',
  styleUrls: ['./practicante-ep.component.css']
})
export class PracticanteEpComponent implements OnInit {
  persona: Persona = new Persona();
  roles = [{ label: 'Practicante', value: 'Practicante' }, { label: 'Tutor', value: 'Tutor' }];
  semestres = ['2023-I', '2023-II', '2024-I'];
  escuelas: any[] = [];
  lineas: any[] = [];
  selectedRole: string = '';
  semestre: string = '';
  linea: any = null;
  escuela: any = null;
  credentialsVisible = false;
  generatedCredentials = { usuario: '', password: '' };
  constructor(
    private personaService: PersonaService,
    private usuarioService: UsuarioService,
    private practicanteService: PracticanteService,
    private practicanteEPService: PracticanteEPService,
    private tutorService: TutorService
  ) {}

  ngOnInit() {
    this.loadEscuelas();
    this.loadLineas();
  }

  loadEscuelas() {
    // Cargar escuelas profesionales desde el servicio.
  }

  loadLineas() {
    // Cargar líneas desde el servicio.
  }

  onSubmit() {
    if (this.selectedRole === 'Practicante') {
      this.registrarPracticante();
    } else if (this.selectedRole === 'Tutor') {
      this.registrarTutor();
    }
  }

  registrarPracticante() {
    this.personaService.createPersona(this.persona).subscribe((persona) => {
      const usuario = new Usuario();
      usuario.usuario = `${persona.nombre}.${persona.apellido}`.toLowerCase();
      usuario.password = Math.random().toString(36).slice(-8);
      usuario.persona = persona;

      this.usuarioService.createUsuario(usuario).subscribe(() => {
        const practicanteEP = new PracticanteEP();
        practicanteEP.escuelasprofesionales.id = 1; // Ingeniería de Sistemas.
        practicanteEP.semestre = this.semestre;

        this.practicanteEPService.createPracticanteEP(practicanteEP).subscribe(() => {
          this.generatedCredentials = {
            usuario: usuario.usuario,
            password: usuario.password,
          };
          this.credentialsVisible = true;
          alert('Practicante registrado y credenciales enviadas.');
        });
      });
    });
  }

  registrarTutor() {
    this.personaService.createPersona(this.persona).subscribe((persona) => {
      const usuario = new Usuario();
      usuario.usuario = `${persona.nombre}.${persona.apellido}`.toLowerCase();
      usuario.password = Math.random().toString(36).slice(-8);
      usuario.persona = persona;

      this.usuarioService.createUsuario(usuario).subscribe(() => {
        const tutor = new Tutor();
        tutor.escuelaprofesionales = this.escuela;
        tutor.personas = persona;

        this.tutorService.createTutor(tutor).subscribe(() => {
          this.generatedCredentials = {
            usuario: usuario.usuario,
            password: usuario.password,
          };
          this.credentialsVisible = true;
          alert('Tutor registrado y credenciales enviadas.');
        });
      });
    });
  }
  onGenerateTemplate() {
    const headers = [['Nombre', 'Apellido', 'Correo', 'DNI', 'Teléfono', 'Rol']];
    const worksheet = XLSX.utils.aoa_to_sheet(headers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Plantilla');
    XLSX.writeFile(workbook, 'PlantillaPracticantesTutors.xlsx');
  }


  
  onExportPDF() {
    const doc = new jsPDF();
    doc.text('Listado de Practicantes y Tutores', 10, 10);
    doc.save('Listado.pdf');
  }

  onExportExcel() {
    const data = [
      ['Nombre', 'Apellido', 'Correo', 'DNI', 'Rol'],
      ['Juan', 'Pérez', 'juan.perez@example.com', '12345678', 'Practicante']
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Listado');
    XLSX.writeFile(workbook, 'Listado.xlsx');
  }
  
  
   
  listaRegistros = [
    { nombre: 'Juan', apellido: 'Pérez', correo: 'juan.perez@example.com', dni: '12345678', rol: 'Practicante' },
    { nombre: 'Ana', apellido: 'García', correo: 'ana.garcia@example.com', dni: '87654321', rol: 'Tutor' }
  ];
  
  onSubmit2() {
    const nuevoRegistro = {
      nombre: this.persona.nombre,
      apellido: this.persona.apellido,
      correo: this.persona.correo_electronico,
      dni: this.persona.dni,
      rol: this.selectedRole
    };
    this.listaRegistros.push(nuevoRegistro);
    this.resetForm();
  }
  
  resetForm() {
    this.persona = new Persona();
    this.selectedRole = '';
  }
  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }
  
  onImport(event: any) {
    const target: DataTransfer = <DataTransfer>event.target;
  
    if (target.files.length !== 1) {
      alert('Por favor, selecciona un único archivo Excel.');
      return;
    }
  
    const file = target.files[0];
    const fileType = file.name.split('.').pop()?.toLowerCase();
  
    if (fileType !== 'xlsx' && fileType !== 'xls') {
      alert('Por favor, selecciona un archivo Excel válido (.xlsx, .xls).');
      return;
    }
  
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0]; 
      const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      this.processImportedData(data);
    };
    reader.readAsBinaryString(file);
  }
  
  processImportedData(data: any[]) {
    if (!data || data.length === 0) {
      alert('El archivo Excel está vacío o no tiene datos válidos.');
      return;
    }
  
    data.forEach((row, index) => {
      
      if (!row['Nombre'] || !row['Apellido'] || !row['Correo'] || !row['DNI'] || !row['Rol']) {
        alert(`Error en la fila ${index + 1}: Falta información requerida.`);
        return;
      }
  
      // Registrar cada fila
      console.log('Procesando fila:', row);
     
    });
  }
  
  
}
