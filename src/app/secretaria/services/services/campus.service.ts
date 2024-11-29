import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Campus } from '../models/campus/campus.module'; 
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CampusService {
  private apiUrl = 'http://localhost:8080/api/campus';

  constructor(private http: HttpClient) { }

  getCampus(): Observable<Campus[]> {
    return this.http.get<Campus[]>(this.apiUrl);
  }

  getCampusById(id: number): Observable<Campus> {
    return this.http.get<Campus>(`${this.apiUrl}/${id}`);
  }

  createCampus(categoria: Campus): Observable<Campus> {
    return this.http.post<Campus>(this.apiUrl, categoria);
  }

  updateCampus(categoria: Campus, id: number): Observable<Campus> {
    return this.http.put<Campus>(`${this.apiUrl}/${id}`, categoria);
  }

  deleteCampus(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}