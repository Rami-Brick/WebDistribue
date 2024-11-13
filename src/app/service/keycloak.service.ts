import { Injectable } from '@angular/core';
import Keycloak from "keycloak-js";
import {UserProfile} from "../../model/user-profile";

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private keycloak: Keycloak.KeycloakInstance;

  constructor() {
    // Initialize Keycloak instance if not already initialized
    this.keycloak = new Keycloak({
      url: 'http://localhost:9090/auth',
      realm: 'CapFest-Project',
      clientId: 'Cap'
    });
  }

  async init() {
    await this.keycloak.init({ onLoad: 'check-sso' });
  }

  async login() {
    if (!this.keycloak.authenticated) {
      await this.keycloak.login();
    }
  }

  async logout() {
    await this.keycloak.logout({ redirectUri: window.location.origin });
  }

}
