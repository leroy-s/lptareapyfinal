import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tutor } from '../models/tutor/tutor.module';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TutorService {
  private apiUrl = 'http://localhost:8080/api/tutores';

  constructor(private http: HttpClient) { }

  getTutor(): Observable<Tutor[]> {
    return this.http.get<Tutor[]>(this.apiUrl);
  }

  getTutorById(id: number): Observable<Tutor> {
    return this.http.get<Tutor>(`${this.apiUrl}/${id}`);
  }

  createTutor(categoria: Tutor): Observable<Tutor> {
    return this.http.post<Tutor>(this.apiUrl, categoria);
  }

  updateTutor(categoria: Tutor, id: number): Observable<Tutor> {
    return this.http.put<Tutor>(`${this.apiUrl}/${id}`, categoria);
  }

  deleteTutor(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}