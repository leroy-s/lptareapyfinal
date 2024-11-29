import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioRol } from '../../practicante/administrar-documentos/models/usuariorol/coordinador-usuariorol.module';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioRolService {
  private apiUrl = 'http://localhost:8080/api/usuariosrol';

  constructor(private http: HttpClient) { }

  getUsuarioRol(): Observable<UsuarioRol[]> {
    return this.http.get<UsuarioRol[]>(this.apiUrl);
  }

  getUsuarioRolById(id: number): Observable<UsuarioRol> {
    return this.http.get<UsuarioRol>(`${this.apiUrl}/${id}`);
  }

  createUsuarioRol(categoria: UsuarioRol): Observable<UsuarioRol> {
    return this.http.post<UsuarioRol>(this.apiUrl, categoria);
  }

  updateUsuarioRol(categoria: UsuarioRol, id: number): Observable<UsuarioRol> {
    return this.http.put<UsuarioRol>(`${this.apiUrl}/${id}`, categoria);
  }

  deleteUsuarioRol(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}