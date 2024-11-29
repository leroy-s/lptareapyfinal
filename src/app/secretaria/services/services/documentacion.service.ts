import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Documentacion } from '../models/documentacion/documentacion.module'; 
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentacionService {
  private apiUrl = 'http://localhost:8080/api/documentaciones';

  constructor(private http: HttpClient) { }

  getDocumentacion(): Observable<Documentacion[]> {
    return this.http.get<Documentacion[]>(this.apiUrl);
  }

  getDocumentacionById(id: number): Observable<Documentacion> {
    return this.http.get<Documentacion>(`${this.apiUrl}/${id}`);
  }

  createDocumentacion(categoria: Documentacion): Observable<Documentacion> {
    return this.http.post<Documentacion>(this.apiUrl, categoria);
  }

  updateDocumentacion(categoria: Documentacion, id: number): Observable<Documentacion> {
    return this.http.put<Documentacion>(`${this.apiUrl}/${id}`, categoria);
  }

  deleteDocumentacion(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}