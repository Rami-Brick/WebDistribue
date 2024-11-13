import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KeycloakConfigServiceService } from '../keycloak-config-service.service';
import { from, Observable, switchMap } from 'rxjs';
import { Reservation } from './Reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8222/api/reservations';

  constructor(
    private http: HttpClient,
    private keycloakService: KeycloakConfigServiceService
  ) {}

  getAllReservations(): Observable<Reservation[]> {
    const token = this.keycloakService.getToken();
    console.log('Token:', token); // Log the token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<Reservation[]>(`${this.apiUrl}/all`, { headers });
  }

  async getAllDiscussions(): Promise<Observable<any>> {
    const token = (await this.keycloakService.isLoggedIn()) ? this.keycloakService.profile?.token : '';
    console.log('Token:', token); // Log the token

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`${this.apiUrl}/all`, { headers });
  }

  getReservationById(id: string): Observable<Reservation> {
    return from(this.keycloakService.isLoggedIn()).pipe(
      switchMap(isLoggedIn => {
        const token = isLoggedIn ? this.keycloakService.profile?.token : '';
        console.log('Token:', token); // Log the token
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.http.get<Reservation>(`${this.apiUrl}/${id}`, { headers });
      })
    );
  }

  createReservation(reservation: Reservation, idEspace: any): Observable<Reservation> {
    const token = this.keycloakService.profile?.token;
    console.log('Token:', token); // Log the token

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<Reservation>(`${this.apiUrl}/create?idEspace=${idEspace}`, reservation, { headers });
  }

  reservationDetails(id: any): Observable<Reservation> {
    const token = this.keycloakService.profile?.token;
    console.log('Token:', token); // Log the token

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Reservation>(`${this.apiUrl}/${id}`, { headers });
  }

  confirmReservation(reservationId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/confirm`, null, { params: { reservationId } });
  }


  updateReservationStatus(reservationId: string, newStatus: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateStatus`, null, {
      params: { reservationId, newStatus }
    });
  }

/*  confirmReservation(reservationId: string): Observable<any> {
    const token = this.keycloakService.profile?.token;
    console.log('Token:', token); // Log the token

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.put(`${this.apiUrl}/confirm`, null, { headers, params: { reservationId } });
  }*/
}
