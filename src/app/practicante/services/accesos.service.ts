import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Accesos } from '../models/accesos';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccesosService {
  private apiUrl = 'http://localhost:8080/api/acceso';

  constructor(private http: HttpClient) { }

  getAccesos(): Observable<Accesos[]> {
    return this.http.get<Accesos[]>(this.apiUrl);
  }

  getAccesosById(id: number): Observable<Accesos> {
    return this.http.get<Accesos>(`${this.apiUrl}/${id}`);
  }

  createAccesos(categoria: Accesos): Observable<Accesos> {
    return this.http.post<Accesos>(this.apiUrl, categoria);
  }

  updateAccesos(categoria: Accesos, id: number): Observable<Accesos> {
    return this.http.put<Accesos>(`${this.apiUrl}/${id}`, categoria);
  }

  deleteAccesos(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
