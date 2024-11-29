import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Campus } from '../models/campus';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CampusService {
  private readonly API_URL = 'http://localhost:8080/mantener';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getCampus(): Observable<Campus[]> {
    return this.http.get<Campus[]>(`${this.API_URL}/campus`, this.getHeaders());
  }

  createCampus(campus: Campus): Observable<Campus> {
    return this.http.post<Campus>(`${this.API_URL}/campus`, campus, this.getHeaders());
  }
}
