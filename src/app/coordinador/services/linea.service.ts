import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Linea } from '../../practicante/administrar-documentos/models/linea/coordinador-linea.module';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LineaService {
  private apiUrl = 'http://localhost:8080/api/lineas';

  constructor(private http: HttpClient) { }

  getLinea(): Observable<Linea[]> {
    return this.http.get<Linea[]>(this.apiUrl);
  }

  getLineaById(id: number): Observable<Linea> {
    return this.http.get<Linea>(`${this.apiUrl}/${id}`);
  }

  createLinea(categoria: Linea): Observable<Linea> {
    return this.http.post<Linea>(this.apiUrl, categoria);
  }

  updateLinea(categoria: Linea, id: number): Observable<Linea> {
    return this.http.put<Linea>(`${this.apiUrl}/${id}`, categoria);
  }

  deleteLinea(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}