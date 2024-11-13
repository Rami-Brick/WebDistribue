import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { KeycloakConfigServiceService } from 'src/app/service/keycloak-config-service.service';
import {Produit} from "./Produit";

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private apiUrl = 'http://localhost:8222/produits';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(
    private http: HttpClient,
    private keycloakService: KeycloakConfigServiceService
  ) { }

  // Récupérer tous les produit
  async getAllProduit(): Promise<Observable<Produit[]>> {
    const token = this.keycloakService.getToken();
    console.log('Token:', token); // Log the token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });    return this.http.get<Produit[]>(`${this.apiUrl}/all`, { headers });
  }

  // Créer un nouvel produit
  async createProduit(produit: Produit): Promise<Observable<Produit>> {
    const token = this.keycloakService.getToken();
    console.log('Token:', token); // Log the token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });    return this.http.post<Produit>(`${this.apiUrl}/save`, produit, { headers });
  }

  // Mettre à jour un espace existant
  /*async updateEspace(id: number, espace: Espaces): Promise<Observable<Espaces>> {
    const headers = await this.getAuthHeaders();
    return this.http.put<Espaces>(`${this.apiUrl}/update/${id}`, espace, { headers });
  }*/


  updateProduit(id: number, produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiUrl}/update/${id}`, produit, this.httpOptions);
  }

  async deleteProduit(id: number): Promise<Observable<void>> {
    const token = this.keycloakService.getToken();
    console.log('Token:', token); // Log the token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }


  async getProduitById(id: number): Promise<Observable<Produit>> {
    const token = this.keycloakService.getToken();
    console.log('Token:', token); // Log the token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });    return this.http.get<Produit>(`${this.apiUrl}/${id}`, { headers });
  }




}
