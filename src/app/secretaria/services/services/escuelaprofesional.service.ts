import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EscuelaProfesional } from '../models/escuelaprofesional/escuelaprofesional.module'; 
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EscuelaService {
  private apiUrl = 'http://localhost:8080/api/Escuela';

  constructor(private http: HttpClient) {}

  getEscuelasByFacultad(facultadId: number): Observable<EscuelaProfesional[]> {
    return this.http.get<EscuelaProfesional[]>(`${this.apiUrl}/facultad/${facultadId}`);
  }
  
  getEscuela(): Observable<EscuelaProfesional[]> {
    return this.http.get<EscuelaProfesional[]>(this.apiUrl);
  }

  getEscuelaById(id: number): Observable<EscuelaProfesional> {
    return this.http.get<EscuelaProfesional>(`${this.apiUrl}/${id}`);
  }

  createEscuela(escuelaProfesional: EscuelaProfesional): Observable<EscuelaProfesional> {
    return this.http.post<EscuelaProfesional>(this.apiUrl, escuelaProfesional);
  }

  updateEscuela(escuelaProfesional: EscuelaProfesional, id: number): Observable<EscuelaProfesional> {
    return this.http.put<EscuelaProfesional>(`${this.apiUrl}/${id}`, escuelaProfesional);
  }

  deleteEscuela(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}