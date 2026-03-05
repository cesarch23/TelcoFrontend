import { Injectable, inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isAuthenticated()) {
    const requiredRoles = route.data['roles'] as string[];
    if (requiredRoles && requiredRoles.length > 0) {
      const userRole = authService.getUserRole();
      if (userRole && requiredRoles.includes(userRole)) {
        return true;
      } else {
        router.navigate(['/unauthorized']);
        return false;
      }
    }
    return true;
  }

  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
