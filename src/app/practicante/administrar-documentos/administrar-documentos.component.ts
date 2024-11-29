import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Tipo_Documento } from './models/tipodocumento/coordinador-tipodocumento.module';
import { DocumentacionService } from './services/documentacion.service';
import { SafeUrlPipe } from './safe-url.pipe';

@Component({
  selector: 'app-administrar-documentos',
  standalone: true,
  imports: [SafeUrlPipe,CommonModule, FormsModule, ButtonModule, InputTextModule, AvatarModule, DropdownModule],
  templateUrl: './administrar-documentos.component.html',
  styleUrl: './administrar-documentos.component.css'
})
export class AdministrarDocumentosComponent {
  documentos: any[] = [];
  tiposDocumentos: Tipo_Documento[] = [];
  tipoDocumentoSeleccionado: number = 0;
  archivoSeleccionado: File | null = null;
  archivoPreview: string | null = null;

  constructor(private documentacionService: DocumentacionService) {}

  ngOnInit() {
    this.cargarDocumentos();
    this.cargarTiposDocumentos();
  }

  cargarDocumentos() {
    this.documentacionService.listarDocumentos().subscribe({
      next: (data) => {
        this.documentos = data;
      },
      error: (err) => {
        console.error('Error al listar documentos:', err);
      }
    });
  }

  cargarTiposDocumentos() {
    this.documentacionService.listarTiposDocumentos().subscribe({
      next: (data) => {
        this.tiposDocumentos = data;
      },
      error: (err) => {
        console.error('Error al listar tipos de documentos:', err);
      }
    });
  }

  onFileSelected(event: any) {
    this.archivoSeleccionado = event.target.files[0];
  }

  subirDocumento() {
    if (!this.archivoSeleccionado || !this.tipoDocumentoSeleccionado) {
      alert('Por favor, seleccione un archivo y un tipo de documento.');
      return;
    }

    const formData = new FormData();
    formData.append('archivo', this.archivoSeleccionado);
    formData.append('id_tipo_documento', this.tipoDocumentoSeleccionado.toString());

    this.documentacionService.subirDocumento(formData).subscribe({
      next: () => {
        alert('Documento subido exitosamente');
        this.cargarDocumentos(); // Refrescar la lista
      },
      error: (err) => {
        console.error('Error al subir el documento:', err);
      }
    });
  }

  previsualizarDocumento(id: number) {
    this.documentacionService.previsualizarDocumento(id).subscribe({
      next: (url) => {
        this.archivoPreview = url;
      },
      error: (err) => {
        console.error('Error al previsualizar el documento:', err);
      }
    });
  }

  descargarDocumento(id: number, event: MouseEvent) {
    event.stopPropagation(); // Prevenir que el click afecte otras acciones
    this.documentacionService.descargarDocumento(id).subscribe({
      next: (blob) => {
        const a = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = 'documento.pdf'; // Cambiar si el nombre se extrae del backend
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error al descargar el documento:', err);
      }
    });
  }
}
