import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Espaces } from 'src/model/Espaces';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { KeycloakConfigServiceService } from 'src/app/service/keycloak-config-service.service';

@Injectable({
  providedIn: 'root'
})
export class EspacesService {
  private apiUrl = 'http://localhost:8222/api/espaces';

  constructor(
    private http: HttpClient,
    private keycloakService: KeycloakConfigServiceService
  ) { }

  // Récupérer tous les espaces
  async getAllEspaces(): Promise<Observable<Espaces[]>> {
    const token = this.keycloakService.getToken();
    console.log('Token:', token); // Log the token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });    return this.http.get<Espaces[]>(`${this.apiUrl}/all`, { headers });
  }

  // Créer un nouvel espace
  async createEspace(espace: Espaces): Promise<Observable<Espaces>> {
    const token = this.keycloakService.getToken();
    console.log('Token:', token); // Log the token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });    return this.http.post<Espaces>(`${this.apiUrl}/create`, espace, { headers });
  }

  // Mettre à jour un espace existant
  /*async updateEspace(id: number, espace: Espaces): Promise<Observable<Espaces>> {
    const headers = await this.getAuthHeaders();
    return this.http.put<Espaces>(`${this.apiUrl}/update/${id}`, espace, { headers });
  }
  async updateEspace(id: number, espace: Espaces): Promise<Observable<Espaces>> {
    const headers = await this.getAuthHeaders();
    return this.http.put<Espaces>(`${this.apiUrl}/update/${id}`, espace, { headers });
  }*/
  async updateEspace(id: number, espace: Espaces): Promise<Observable<Espaces>> {
    const token = this.keycloakService.getToken();
    console.log('Token:', token); // Log the token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });    return this.http.put<Espaces>(`${this.apiUrl}/update/${id}`, espace, { headers });
  }

  async deleteEspace(id: number): Promise<Observable<void>> {
    const token = this.keycloakService.getToken();
    console.log('Token:', token); // Log the token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, { headers });
  }


  async getEspaceById(id: number): Promise<Observable<Espaces>> {
    const token = this.keycloakService.getToken();
    console.log('Token:', token); // Log the token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });    return this.http.get<Espaces>(`${this.apiUrl}/${id}`, { headers });
  }

}
