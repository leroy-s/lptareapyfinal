import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

export const authGuard = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('🚦 Iniciando verificación de guard');

  if (!authService.isAuthenticated()) {
    console.log('❌ Usuario no autenticado');
    router.navigate(['/login']);
    return false;
  }

  const requiredRoles = route.data['roles'] as Array<string>;
  console.log('📝 Ruta actual:', route.url);
  console.log('🎯 Roles requeridos:', requiredRoles);

  if (requiredRoles && requiredRoles.length > 0) {
    console.log('🔍 Verificando roles...');
    const userRoles = authService.getUserRoles();
    console.log('👤 Roles del usuario:', userRoles);

    const hasRole = requiredRoles.some(role => {
      console.log(`🔄 Verificando rol: ${role}`);
      const result = authService.hasRole(role);
      console.log(`${result ? '✅' : '❌'} Resultado para ${role}:`, result);
      return result;
    });

    if (!hasRole) {
      console.log('⛔ Acceso denegado: Usuario no tiene los roles requeridos');
      router.navigate(['/unauthorized']);
      return false;
    }
    console.log('✅ Acceso permitido');
  }

  return true;
};
