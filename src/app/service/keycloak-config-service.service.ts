// keycloak-config-service.service.ts

import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { UserProfile } from '../../model/user-profile';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class KeycloakConfigServiceService {
  private _profile: UserProfile | undefined;
  private _clientSecretToken: string | undefined; // Store client credentials token if needed
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false); // Observable for auth status

  constructor(private keycloakService: KeycloakService) {}

  // Initialize Keycloak for interactive login and fetch the user profile
  async init() {
    console.log('Starting Keycloak initialization...');
    try {
      await this.keycloakService.init({
        config: {
          url: 'http://localhost:9090',
          realm: 'CapFest-Project',
          clientId: 'Cap',
        },
        initOptions: {
          onLoad: 'check-sso',
        },

      });

      // Check if the user is authenticated
      const authenticated = await this.keycloakService.isLoggedIn();
      console.log('Is user authenticated?', authenticated);

      if (authenticated) {
        const keycloakInstance = this.keycloakService.getKeycloakInstance();
        this._profile = (await keycloakInstance.loadUserProfile()) as UserProfile;
        this._profile.token = keycloakInstance.token; // Store token for later use

        //add the method to save token in session storage
        this.saveToken(this._profile.token);
        this.saveUser(this._profile);


        console.log('User profile loaded:', this._profile);
      }

      // Update authentication status
      this.isAuthenticatedSubject.next(authenticated);
    } catch (error) {
      console.error('Keycloak initialization error:', error);
      // Set to false on error
      this.isAuthenticatedSubject.next(false);
    }
  }

  // Method to initiate user login
  login() {
    return this.keycloakService.login();
  }

  // Method to logout user and redirect to the home page
  async logout() {
    const redirectUri = 'http://localhost:4200/home-one'; // Ensure this matches your registered URI
    await this.keycloakService.logout(redirectUri);
    this._profile = undefined; // Clear the profile on logout
    this.isAuthenticatedSubject.next(false); // Update the authentication status
  }

  // Getter for user profile data
  get profile(): UserProfile | undefined {
    return this._profile;
  }

  // Method to check if user is logged in
  async isLoggedIn(): Promise<boolean> {
    const isLoggedIn = await this.keycloakService.isLoggedIn();
    this.isAuthenticatedSubject.next(isLoggedIn);
    return isLoggedIn;
  }

  // Method to obtain token using client credentials for backend communication
  async authenticateWithClientSecret() {
    try {
      const tokenUrl = `http://localhost:9090/realms/CapFest-Project/protocol/openid-connect/token`;
      const body = new URLSearchParams();
      body.set('grant_type', 'client_credentials');
      body.set('client_id', 'Cap');
      body.set('client_secret', 'LaOMZwa7EA1C4sBd6nZsXlnjTLR3jqwH'); // Update with actual secret

      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (response.ok) {
        const data = await response.json();
        this._clientSecretToken = data.access_token;
        console.log('Token obtained successfully:', data);
      } else {
        const errorDetails = await response.text(); // Capture error details from Keycloak
        console.error('Failed to obtain token:', response.statusText, errorDetails);
      }
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  }

  // Getter for client secret token
  get clientSecretToken(): string | undefined {
    return this._clientSecretToken;
  }

  // Method to get the observable for authentication status
  get isAuthenticated$() {
    return this.isAuthenticatedSubject.asObservable();
  }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: any): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const userString = sessionStorage.getItem(USER_KEY);
    return userString ? JSON.parse(userString) : null;
  }


}
