import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define la interfaz basada en tu modelo
export interface EscuelaLineas {
  id: number;
  carrera: string;
  lineasNombres: string[];
  idFacultad: number;
}

@Injectable({
  providedIn: 'root' // Este servicio estará disponible en toda la aplicación
})
export class EscuelaLineasService {

  private apiUrl = 'http://localhost:8080/api/escuelas-lineas'; // URL de la API

  constructor(private http: HttpClient) {}

  // Método para obtener los datos de la escuela y las líneas asociadas
  getEscuelaLineas(carreraId: number): Observable<EscuelaLineas> {
    return this.http.get<EscuelaLineas>(`${this.apiUrl}/${carreraId}`);
  }
}