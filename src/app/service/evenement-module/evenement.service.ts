import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../../shared/models/evenement.model';
@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  private baseUrl = 'http://localhost:8222/evenement'; // Replace with your actual backend URL

  constructor(private http: HttpClient) {}

  // Method to add a new event
  addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.baseUrl}/add`, event);
  }

  // Method to retrieve all events
  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}/all`);
  }

  // Method to retrieve an event by ID
  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}/${id}`);
  }

  // Method to delete an event by ID
  deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }

  // Method to delete all events
  deleteAllEvents(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/all`, { responseType: 'text' });
  }

    // Method to update an event by ID
    updateEvent(eventId: number, event: Event): Observable<any> {
     return this.http.put(`${this.baseUrl}/update/${eventId}`, event, { responseType: 'text' });
}
}
