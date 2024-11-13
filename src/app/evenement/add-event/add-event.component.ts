import { Component, OnInit } from '@angular/core';
import { Event } from '../../shared/models/evenement.model';
import { EvenementService } from '../../service/evenement-module/evenement.service';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { routes } from "../../core/helpers/routes/routes";
import { url } from "../../shared/models/header.model";
import { SidebarService } from "../../service/sidebar.service";
import { CommonService } from "../../service/common.service";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  event: Event = {
    nom: '',
    description: '',
    dateDebut: new Date(),
    dateFin: new Date(),
    lieu: '',
    nombreParticipants: 0,
    organisateur: '',
    prix: 0
  };
  isLoading = false;
  error: string | null = null;

  // Sidebar and route tracking variables
  showMiniSidebar = false;
  public base = '';
  public page = '';
  public last = '';
  public tittle = 'Événements';
  public strokeValue = 0;
  public progress = 0;
  public firstHeader = false;
  public hideFooter = false;
  protected readonly routes = routes;

  constructor(
    private eventService: EvenementService,
    private router: Router,
    private sidebar: SidebarService,
    private common: CommonService
  ) {
    // Subscribe to route changes
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.getroutes(event);
      }
    });

    // Subscribe to sidebar toggling
    this.sidebar.toogleSidebar.subscribe((res: string) => {
      this.showMiniSidebar = res === 'true';
    });
  }

  ngOnInit(): void {
    this.calculateScrollPercentage();
  }

  // Method to handle the submission of the form
  addEvent(): void {
    this.isLoading = true;
    this.eventService.addEvent(this.event).subscribe({
      next: (response) => {
        console.log('Event added successfully:', response);
        this.isLoading = false;
        this.resetForm();
        this.router.navigate([routes.listevent]); // Redirect after successful addition
      },
      error: (err) => {
        console.error('Error adding event:', err);
        this.error = 'Erreur lors de l\'ajout de l\'événement';
        this.isLoading = false;
      }
    });
  }

  // Reset form fields after submission
  private resetForm(): void {
    this.event = {
      nom: '',
      description: '',
      dateDebut: new Date(),
      dateFin: new Date(),
      lieu: '',
      nombreParticipants: 0,
      organisateur: '',
      prix: 0
    };
    this.error = null;
  }

  // Calculate scroll percentage for progress tracking
  private calculateScrollPercentage(): void {
    window.addEventListener('scroll', () => {
      const body = document.body,
        html = document.documentElement;
      const totalHeight = Math.max(
        body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight
      );
      this.progress = totalHeight;
      const currentDistance = window.scrollY / (totalHeight / 3000);
      this.strokeValue = totalHeight - currentDistance / 8;

      if (window.scrollY === 0) {
        this.strokeValue = totalHeight;
      }
      if (window.innerHeight + window.scrollY >= totalHeight) {
        this.strokeValue = 0;
      }
    });
  }

  // Determine breadcrumb route title and header visibility
  private getroutes(route: url): void {
    const splitVal = route.url.split('/');
    this.base = splitVal[1];
    this.page = splitVal[2];
    this.last = splitVal[3];

    switch (splitVal.length) {
      case 2:
        this.tittle = this.base;
        break;
      case 3:
        this.tittle = this.page;
        break;
      case 4:
        this.tittle = this.last;
        break;
      default:
        this.tittle = 'Événements';
        break;
    }

    this.firstHeader = ![
      routes.home2, routes.home3, routes.home4,
      routes.home5, routes.home6, routes.home7,
      routes.home8, routes.home9
    ].includes(route.url);

    this.hideFooter = [routes.listingmaplist, routes.listingmapgrid].includes(route.url);
  }
}
