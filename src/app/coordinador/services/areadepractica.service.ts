import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Areadepractica } from '../../practicante/administrar-documentos/models/areadepractica/coordinador-areadepractica.module';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AreadepracticaService {
  private apiUrl = 'http://localhost:8080/api/areapracticas';

  constructor(private http: HttpClient) { }

  getAreadepractica(): Observable<Areadepractica[]> {
    return this.http.get<Areadepractica[]>(this.apiUrl);
  }

  getAreadepracticaById(id: number): Observable<Areadepractica> {
    return this.http.get<Areadepractica>(`${this.apiUrl}/${id}`);
  }

  createAreadepractica(categoria: Areadepractica): Observable<Areadepractica> {
    return this.http.post<Areadepractica>(this.apiUrl, categoria);
  }

  updateAreadepractica(categoria: Areadepractica, id: number): Observable<Areadepractica> {
    return this.http.put<Areadepractica>(`${this.apiUrl}/${id}`, categoria);
  }

  deleteAreadepractica(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}