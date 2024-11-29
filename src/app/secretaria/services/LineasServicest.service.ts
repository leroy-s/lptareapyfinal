import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EscuelaLineast } from '../models/escuela-lineapt'; // Modelo de las líneas
import { Estudiantest } from '../models/Estudiantest'; // Modelo de estudiantes

@Injectable({
  providedIn: 'root'
})
export class LineasService {
  private apiUrl = 'http://localhost:8080/api/escuelas-lineas';  // URL para obtener las líneas de la carrera

  constructor(private http: HttpClient) {}

  // Obtener las líneas de la escuela
  getEscuelaLineas(carreraId: number): Observable<EscuelaLineast> {
    return this.http.get<EscuelaLineast>(`${this.apiUrl}/${carreraId}`);
  }

  // Obtener estudiantes por línea
  getEstudiantesPorLinea(idLinea: number): Observable<Estudiantest[]> {
    return this.http.get<Estudiantest[]>(`http://localhost:8080/api/list-practicas/linea/${idLinea}`);
  }
}