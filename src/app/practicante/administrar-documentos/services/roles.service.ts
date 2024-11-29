import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Roles } from '../../practicante/administrar-documentos/models/rol/coordinador-roles.module';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private apiUrl = 'http://localhost:8080/api/rol';

  constructor(private http: HttpClient) { }

  getRoles(): Observable<Roles[]> {
    return this.http.get<Roles[]>(this.apiUrl);
  }

  getRolesById(id: number): Observable<Roles[]> {
    return this.http.get<Roles[]>(`${this.apiUrl}/${id}`);
}
  

  createRoles(categoria: Roles): Observable<Roles> {
    return this.http.post<Roles>(this.apiUrl, categoria);
  }

  updateRoles(categoria: Roles, id: number): Observable<Roles> {
    return this.http.put<Roles>(`${this.apiUrl}/${id}`, categoria);
  }

  deleteRoles(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
