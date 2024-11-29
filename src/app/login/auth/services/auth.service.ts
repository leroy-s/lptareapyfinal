import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { AuthLoginRequest, AuthResponse } from '../AuthLoginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/auth';
  private readonly jwtHelper = new JwtHelperService();
  private authUser = new BehaviorSubject<AuthResponse | null>(null);
  public currentUser$ = this.authUser.asObservable();

  constructor(private http: HttpClient) {
    this.checkToken();
  }

  public login(credentials: AuthLoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials)
      .pipe(
        tap(response => {
          if (response.status) {
            this.setSession(response);
          }
        }),
        catchError(this.handleError)
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.authUser.next(null);
  }

  private setSession(response: AuthResponse): void {
    localStorage.setItem('token', response.jwt);
    localStorage.setItem('username', response.username);
    this.authUser.next(response);
  }

  isAuthenticated(): boolean {
    return this.isTokenValid();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): string | null {
    return localStorage.getItem('username');
  }

  getUserAuthorities(): string[] {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken = this.jwtHelper.decodeToken(token);
        return decodedToken.authorities?.split(',') || [];
      } catch {
        return [];
      }
    }
    return [];
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      return !this.jwtHelper.isTokenExpired(token);
    } catch {
      return false;
    }
  }

  private checkToken(): void {
    const token = this.getToken();
    const username = this.getCurrentUser();

    if (token && username && this.isTokenValid()) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.authUser.next({
        username,
        jwt: token,
        status: true,
        message: 'Sesión restaurada',
        authorities: decodedToken.authorities
      });
    } else {
      this.logout();
    }
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.error?.message || 'Error del servidor';
    }
    return throwError(() => errorMessage);
  }

  getUserRoles(): string[] {
    const token = this.getToken();
    if (!token) {
      console.warn('No hay token disponible');
      return [];
    }

    try {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log('🔍 Token decodificado completo:', decodedToken);
      console.log('🎭 Authorities del token:', decodedToken.authorities);

      if (decodedToken && decodedToken.authorities) {
        let roles = [];
        if (typeof decodedToken.authorities === 'string') {
          roles = decodedToken.authorities.split(',');
        } else {
          roles = Array.isArray(decodedToken.authorities) ?
                 decodedToken.authorities : [decodedToken.authorities];
        }
        console.log('📋 Roles extraídos:', roles);
        const trimmedRoles = roles.map((role: string) => role.trim());
        console.log('✨ Roles procesados:', trimmedRoles);
        return trimmedRoles;
      }
    } catch (error) {
      console.error('❌ Error al decodificar token:', error);
    }
    return [];
  }

  hasRole(role: string): boolean {
    const userRoles = this.getUserRoles();
    const normalizedRequiredRole = role.toUpperCase().replace('ROLE_', '');

    console.log('🔑 Token actual:', this.getToken());
    console.log('👤 Roles del usuario sin procesar:', userRoles);
    console.log('🎯 Rol requerido (normalizado):', normalizedRequiredRole);

    const hasRole = userRoles.some(userRole => {
      const normalizedUserRole = userRole.trim().toUpperCase().replace('ROLE_', '');
      console.log(`🔄 Comparando: "${normalizedUserRole}" con "${normalizedRequiredRole}"`);
      const matches = normalizedUserRole === normalizedRequiredRole;
      console.log(`${matches ? '✅' : '❌'} Coincidencia:`, matches);
      return matches;
    });

    console.log(`🎭 Resultado final: ${hasRole ? 'Tiene el rol' : 'No tiene el rol'}`);
    return hasRole;
  }
}
