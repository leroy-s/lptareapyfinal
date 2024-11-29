import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Practicante } from '../models/practicante/coordinador-practicante.module'; 
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PracticanteService {
  private apiUrl = 'http://localhost:8080/api/practicantes';

  constructor(private http: HttpClient) { }

  getPracticante(): Observable<Practicante[]> {
    return this.http.get<Practicante[]>(this.apiUrl);
  }

  getPracticanteById(id: number): Observable<Practicante> {
    return this.http.get<Practicante>(`${this.apiUrl}/${id}`);
  }

  createPracticante(categoria: Practicante): Observable<Practicante> {
    return this.http.post<Practicante>(this.apiUrl, categoria);
  }

  updatePracticante(categoria: Practicante, id: number): Observable<Practicante> {
    return this.http.put<Practicante>(`${this.apiUrl}/${id}`, categoria);
  }

  deletePracticante(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}