import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Escuela } from '../models/escuela';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EscuelaService {
  private apiUrl = 'http://localhost:8080/api/Escuela';

  constructor(private http: HttpClient) {}

  getEscuelasByFacultad(facultadId: number): Observable<Escuela[]> {
    return this.http.get<Escuela[]>(`${this.apiUrl}/facultad/${facultadId}`);
  }
  
  getEscuela(): Observable<Escuela[]> {
    return this.http.get<Escuela[]>(this.apiUrl);
  }

  getEscuelaById(id: number): Observable<Escuela> {
    return this.http.get<Escuela>(`${this.apiUrl}/${id}`);
  }

  createEscuela(escuelaProfesional: Escuela): Observable<Escuela> {
    return this.http.post<Escuela>(this.apiUrl, escuelaProfesional);
  }

  updateEscuela(escuelaProfesional: Escuela, id: number): Observable<Escuela> {
    return this.http.put<Escuela>(`${this.apiUrl}/${id}`, escuelaProfesional);
  }

  deleteEscuela(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
