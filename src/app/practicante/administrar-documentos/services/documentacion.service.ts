import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { Documentacion } from '../models/documentacion/coordinador-documentacion.module';
import { Tipo_Documento } from '../models/tipodocumento/coordinador-tipodocumento.module';

@Injectable({
  providedIn: 'root'
})
export class DocumentacionService {
  private baseUrl = 'http://localhost:8080/documentos/subir-archivo'; // Endpoint del backend
  private tiposUrl = 'http://localhost:8080/tipodocumentaciones'; // Endpoint de tipos de documentos

  // Cancelación de subida
  private cancelSubidaSubject = new Subject<void>();

  constructor(private http: HttpClient) {}

  // Subir un archivo con la opción de cancelación
  subirDocumento(formData: FormData): Observable<any> {
    return new Observable((observer) => {
      const req = new XMLHttpRequest();
      req.open('POST', `${this.baseUrl}/subir-archivo`, true);

      req.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          observer.next({ progress });
        }
      };

      req.onload = () => {
        if (req.status >= 200 && req.status < 300) {
          observer.next(JSON.parse(req.response));
          observer.complete();
        } else {
          observer.error(new Error(req.statusText));
        }
      };

      req.onerror = () => observer.error(new Error('Error al subir el archivo.'));
      req.onabort = () => observer.error(new Error('Subida cancelada.'));

      // Cancelar la subida si se emite el evento
      const cancelSub = this.cancelSubidaSubject.subscribe(() => req.abort());

      req.send(formData);

      // Limpiar la suscripción al cancelar
      return () => cancelSub.unsubscribe();
    });
  }

  // Cancelar la subida
  cancelarSubida(): void {
    this.cancelSubidaSubject.next();
  }

  // Listar documentos
  listarDocumentos(): Observable<Documentacion[]> {
    return this.http.get<Documentacion[]>(`${this.baseUrl}`).pipe(
      catchError((error) => {
        console.error('Error al listar documentos:', error);
        return throwError(() => new Error('Error al listar documentos.'));
      })
    );
  }

  // Listar tipos de documentos
  listarTiposDocumentos(): Observable<Tipo_Documento[]> {
    return this.http.get<Tipo_Documento[]>(`${this.tiposUrl}`).pipe(
      catchError((error) => {
        console.error('Error al listar tipos de documentos:', error);
        return throwError(() => new Error('Error al listar tipos de documentos.'));
      })
    );
  }

  // Eliminar un documento por ID
  eliminarDocumento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error al eliminar el documento:', error);
        return throwError(() => new Error('Error al eliminar el documento.'));
      })
    );
  }

  // Descargar un documento
  descargarDocumento(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${id}/archivo`, { responseType: 'blob' }).pipe(
      catchError((error) => {
        console.error('Error al descargar el archivo:', error);
        return throwError(() => new Error('Error al descargar el archivo.'));
      })
    );
  }

  // Previsualizar un archivo (retorna la URL del archivo)
  previsualizarDocumento(id: number): Observable<string> {
    return new Observable((observer) => {
      this.descargarDocumento(id).subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          observer.next(url);
          observer.complete();
        },
        error: (error) => observer.error(error),
      });
    });
  }}