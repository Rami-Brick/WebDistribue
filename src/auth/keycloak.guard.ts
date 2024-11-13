import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class KeycloakGuard implements CanActivate {
  constructor(private keycloakService: KeycloakService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    try {
      const isLoggedIn = await this.keycloakService.isLoggedIn();
      if (isLoggedIn) {
        return true;
      } else {
        await this.keycloakService.login();
        return false; // Prevent access until user is logged in
      }
    } catch (error) {
      console.error('Error in KeycloakGuard:', error);
      return false; // Prevent access if there's an error
    }
  }
}
