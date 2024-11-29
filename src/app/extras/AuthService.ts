import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  logout(): void {
    console.log("Cerrando sesión...");

    // Eliminar cualquier token de autenticación o información almacenada
    localStorage.removeItem('authToken');  // o sessionStorage.removeItem('authToken');

    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }
}
