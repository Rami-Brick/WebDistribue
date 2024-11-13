import { Component, OnInit } from '@angular/core';
import { Event } from '../../shared/models/evenement.model';
import { EvenementService } from '../../service/evenement-module/evenement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.scss']
})
export class ListEventComponent implements OnInit {
  events: Event[] = []; // Array to store the list of events
  isLoading = true; // Variable to manage loading state
  errorMessage: string | null = null; // Variable to manage error messages

  // Sidebar and header control variables
  showMiniSidebar = false;
  firstHeader = true;

  constructor(private eventService: EvenementService, private router: Router) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  // Method to retrieve events from the service
  fetchEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching events:', err);
        this.errorMessage = 'Unable to fetch events. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  // Method to handle edit button click
  onEditButtonClick(eventId: number): void {
    this.router.navigate(['/edit-event', eventId]);
  }

  // Method to handle delete button click
  onDeleteButtonClick(eventId: number): void {
    // Add your deletion logic here, such as calling a delete method on the service
    this.eventService.deleteEvent(eventId).subscribe({
      next: () => {
        console.log(`Event with ID ${eventId} deleted successfully.`);
        this.fetchEvents(); // Refresh the event list after deletion
      },
      error: (err) => {
        console.error('Error deleting event:', err);
        this.errorMessage = 'Failed to delete the event. Please try again later.';
      }
    });
  }
}
