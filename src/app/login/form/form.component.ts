import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from './../auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { AuthResponse } from '../auth/AuthLoginRequest';

@Component({
    selector: 'login-form',
    standalone: true,

    imports: [
        CommonModule,
        ToastModule,
        FormsModule,         // Necesario para [(ngModel)]
        InputTextModule,     // Campo de texto
        ButtonModule,        // Botón
        CheckboxModule
    ],
    providers: [MessageService],
    templateUrl: './form.component.html',
    styleUrl: './form.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  loginData = {
    username: '',
    password: '',
    remember: false
  };
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private MessageService: MessageService
  ) {}

  onSubmit(): void {
    console.log('🔵 Iniciando login...');
    if (!this.loginData.username || !this.loginData.password) {
      console.log('❌ Campos incompletos');
      this.MessageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Complete todos los campos'
      });
      return;
    }

    this.loading = true;
    console.log('🔑 Intentando login con usuario:', this.loginData.username);

    this.authService.login({
      username: this.loginData.username,
      password: this.loginData.password
    }).subscribe({
      next: (response: AuthResponse) => {
        console.log('✅ Respuesta del servidor:', response);
        if (response.status) {
          if (this.loginData.remember) {
            localStorage.setItem('remember_user', this.loginData.username);
          }
          const authorities = this.authService.getUserAuthorities();
          console.log('👤 Roles del usuario:', authorities);

          if (authorities.includes('ROLE_ADMIN')) {
            console.log('🎯 Redirigiendo a /sidebar (ADMIN)');
            this.router.navigate(['/sidebar']);
          } else if (authorities.includes('ROLE_DIRECTOR')) {
            console.log('🎯 Redirigiendo a /director');
            this.router.navigate(['/director']);
          } else if (authorities.includes('ROLE_COORDINADOR')) {
            console.log('🎯 Redirigiendo a /coordinador');
            this.router.navigate(['/coordinador']);
          } else if (authorities.includes('ROLE_SECRETARIA')) {
            console.log('🎯 Redirigiendo a /secretaria');
            this.router.navigate(['/secretaria']);
          } else if (authorities.includes('ROLE_PRACTICANTE')) {
            console.log('🎯 Redirigiendo a /sidebarpracticante');
            this.router.navigate(['/sidebarpracticante/inicio']);
          } else {
            console.log('⛔ Sin permisos suficientes');
            this.MessageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No tiene permisos suficientes'
            });
          }
        } else {
          console.log('❌ Error de autenticación:', response.message);
          this.MessageService.add({
            severity: 'error',
            summary: 'Error',
            detail: response.message || 'Error de autenticación'
          });
        }
      },
      error: (error: any) => {
        console.error('🔴 Error en login:', error);
        this.MessageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error || 'Error al conectar con el servidor'
        });
      },
      complete: () => {
        console.log('🏁 Login proceso completado');
        this.loading = false;
      }
    });
  }
}
