import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Representante } from '../../practicante/administrar-documentos/models/representante/coordinador-representante.module';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepresentanteService {
  private apiUrl = 'http://localhost:8080/api/representantes';

  constructor(private http: HttpClient) { }

  getRepresentante(): Observable<Representante[]> {
    return this.http.get<Representante[]>(this.apiUrl);
  }

  getRepresentanteById(id: number): Observable<Representante> {
    return this.http.get<Representante>(`${this.apiUrl}/${id}`);
  }

  createRepresentante(categoria: Representante): Observable<Representante> {
    return this.http.post<Representante>(this.apiUrl, categoria);
  }

  updateRepresentante(categoria: Representante, id: number): Observable<Representante> {
    return this.http.put<Representante>(`${this.apiUrl}/${id}`, categoria);
  }

  deleteRepresentante(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}