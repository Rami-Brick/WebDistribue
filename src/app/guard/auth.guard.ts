import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {KeycloakService} from "keycloak-angular";

export const authGuard: CanActivateFn = () => {
  const tokenService = inject(KeycloakService);
  const router = inject(Router);
  if (tokenService.isTokenExpired()) {
    router.navigate(['login']);
    return false;
  }
  return true;
};
