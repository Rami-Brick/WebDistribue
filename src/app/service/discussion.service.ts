import { Injectable } from '@angular/core';
import {KeycloakConfigServiceService} from "./keycloak-config-service.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Discussion} from "../../model/Forum/Discussion";

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {
  private apiUrl = 'http://localhost:8222/api/discussions/'; // Base endpoint URL for discussions

  constructor(
    private http: HttpClient,
    private keycloakService: KeycloakConfigServiceService
  ) {}

  getAllDiscussions(): Observable<Discussion[]> {
    const token = this.keycloakService.getToken() ;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Discussion[]>(`${this.apiUrl}getall`, { headers });
  }

  createDiscussion(discussion: Discussion): Observable<Discussion> {
    const token = this.keycloakService.profile?.token;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<Discussion>(`${this.apiUrl}save`, discussion, { headers });
  }

  getDiscussionsByUser(): Observable<Discussion[]> {
    const token =  this.keycloakService.profile?.token;
    console.log('Token:', token); // Log the token for inspection

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Discussion[]>(`${this.apiUrl}user/discussions`, { headers });
  }

  deleteDiscussion(discussionId: string): Observable<void> {
    const token = this.keycloakService.profile?.token;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete<void>(`${this.apiUrl}delete/${discussionId}`, { headers });
  }

  updateDiscussion(discussionId: string, updatedDiscussion: Discussion): Observable<Discussion> {
    const token =  this.keycloakService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put<Discussion>(`${this.apiUrl}update/${discussionId}`, updatedDiscussion, { headers });
  }
  getDiscussionById(discussionId: string): Observable<Discussion> {
    const token = this.keycloakService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Discussion>(`${this.apiUrl}${discussionId}`, { headers });
  }
  likeDiscussion(discussionId: string): Observable<Discussion> {
    const token = this.keycloakService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<Discussion>(`${this.apiUrl}like/${discussionId}`, {}, { headers });
  }

  unlikeDiscussion(discussionId: string): Observable<Discussion> {
    const token = this.keycloakService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<Discussion>(`${this.apiUrl}unlike/${discussionId}`, {}, { headers });
  }
  getAllDiscussionsWithComments(): Observable<Discussion[]> {
    const token =  this.keycloakService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Discussion[]>(`${this.apiUrl}getAllWithComments`, { headers });
  }
  getDiscussionWithComments(discussionId: string): Observable<Discussion> {
    const token = this.keycloakService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Discussion>(`${this.apiUrl}getWithComments/${discussionId}`, { headers });
  }


}
