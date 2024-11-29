import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona/persona.module'; 
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private apiUrl = 'http://localhost:8080/api/personas';

  constructor(private http: HttpClient) { }

  getPersona(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.apiUrl);
  }

  getPersonaById(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiUrl}/${id}`);
  }

  createPersona(categoria: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.apiUrl, categoria);
  }

  updatePersona(categoria: Persona, id: number): Observable<Persona> {
    return this.http.put<Persona>(`${this.apiUrl}/${id}`, categoria);
  }

  deletePersona(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}