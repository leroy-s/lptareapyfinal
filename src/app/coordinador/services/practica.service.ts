import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Practicas } from '../models/practica/coordinador-practica.module'; 
import { HttpClient } from '@angular/common/http';
import { PracticanteEP } from '../models/practicante-ep/coordinador-practicante-ep.module'; 
@Injectable({
  providedIn: 'root'
})
export class PracticasService {
  private apiUrl = 'http://localhost:8080/api/ppps';

  constructor(private http: HttpClient) { }

  getPracticas(): Observable<Practicas[]> {
    return this.http.get<Practicas[]>(this.apiUrl);
  }
  obtenerPracticantes(): Observable<PracticanteEP[]> {
    return this.http.get<PracticanteEP[]>(this.apiUrl);
  }
  getPracticasById(id: number): Observable<Practicas> {
    return this.http.get<Practicas>(`${this.apiUrl}/${id}`);
  }

  createPracticas(categoria: Practicas): Observable<Practicas> {
    return this.http.post<Practicas>(this.apiUrl, categoria);
  }

  updatePracticas(categoria: Practicas, id: number): Observable<Practicas> {
    return this.http.put<Practicas>(`${this.apiUrl}/${id}`, categoria);
  }

  deletePracticas(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}