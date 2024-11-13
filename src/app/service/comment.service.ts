import { Injectable } from '@angular/core';
import {KeycloakConfigServiceService} from "./keycloak-config-service.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8222/api/comments/'; // Base endpoint URL for comments

  constructor(
    private http: HttpClient,
    private keycloakService: KeycloakConfigServiceService
  ) {}

  // Add a new comment
  addComment(discussionId: string,  content: string): Observable<Comment> {
    const token = this.keycloakService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const requestBody = { discussionId, content };

    return this.http.post<Comment>(`${this.apiUrl}add`, requestBody, { headers });
  }
  upvoteComment(commentId: string): Observable<Comment> {
    const token = this.keycloakService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<Comment>(`${this.apiUrl}upvote/${commentId}`, {}, { headers });
  }

  // Downvote a comment
  downvoteComment(commentId: string): Observable<Comment> {
    const token = this.keycloakService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<Comment>(`${this.apiUrl}downvote/${commentId}`, {}, { headers });
  }

}
