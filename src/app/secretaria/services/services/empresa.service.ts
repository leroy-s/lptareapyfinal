import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresa } from '../models/empresa/empresa.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiUrl = 'http://localhost:8080/api/empresas';

  constructor(private http: HttpClient) { }

  getEmpresa(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.apiUrl);
  }

  getEmpresaById(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.apiUrl}/${id}`);
  }

  createEmpresa(categoria: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.apiUrl, categoria);
  }

  updateEmpresa(categoria: Empresa, id: number): Observable<Empresa> {
    return this.http.put<Empresa>(`${this.apiUrl}/${id}`, categoria);
  }

  deleteEmpresa(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
