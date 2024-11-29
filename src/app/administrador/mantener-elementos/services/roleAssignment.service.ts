import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RoleAssignment } from "../models/RoleAssignment";
import { RoleAssignmentView } from "../models/RoleAssignmentView";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoleAssignmentService {
  private readonly API_URL = 'http://localhost:8080/asignar';

  constructor(private http: HttpClient) {}

  assignRole(roleAssignment: RoleAssignment): Observable<any> {
    // Asegurarse de que los datos coincidan exactamente con el formato esperado
    const payload = {
      roleEnum: roleAssignment.roleEnum,
      facultadId: Number(roleAssignment.facultadId), // Asegurarse de que sea número
      escuelaId: Number(roleAssignment.escuelaId),   // Asegurarse de que sea número
      permissions: Array.from(roleAssignment.permissions).map(p => p.trim().toUpperCase())
    };

    console.log('Payload being sent:', JSON.stringify(payload, null, 2)); // Para debugging

    return this.http.post<any>(`${this.API_URL}/rol`, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getAllRoleAssignments(): Observable<RoleAssignmentView[]> {
    console.log('Fetching all role assignments'); // Para debugging
    return this.http.get<RoleAssignmentView[]>(`${this.API_URL}/rol`);
  }

  // Opcional: Obtener por escuela específica
  getRoleAssignmentsByEscuela(escuelaId: number): Observable<RoleAssignmentView[]> {
    return this.http.get<RoleAssignmentView[]>(`${this.API_URL}/rol/escuela/${escuelaId}`);
  }

  getFacultades(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/mantener/facultad');
  }

  getEscuelasByFacultad(facultadId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/mantener/escuela/facultad/${facultadId}`);
  }
}
