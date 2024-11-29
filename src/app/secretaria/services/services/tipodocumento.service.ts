import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tipo_Documento } from '../models/tipodocumento/tipodocumento.module'; 

@Injectable({
  providedIn: 'root'
})
export class Tipo_DocumentoService {
  private apiUrl = 'http://localhost:8080/api/tipodocumentos';

  constructor(private http: HttpClient) { }

  getTipo_Documento(): Observable<Tipo_Documento[]> {
    return this.http.get<Tipo_Documento[]>(this.apiUrl);
  }

  getTipo_DocumentoById(id: number): Observable<Tipo_Documento> {
    return this.http.get<Tipo_Documento>(`${this.apiUrl}/${id}`);
  }

  createTipo_Documento(categoria: Tipo_Documento): Observable<Tipo_Documento> {
    return this.http.post<Tipo_Documento>(this.apiUrl, categoria);
  }

  updateTipo_Documento(categoria: Tipo_Documento, id: number): Observable<Tipo_Documento> {
    return this.http.put<Tipo_Documento>(`${this.apiUrl}/${id}`, categoria);
  }

  deleteTipo_Documento(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
