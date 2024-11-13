import { Component, OnInit } from '@angular/core';
import { EspacesService } from 'src/app/service/Espaces/espaces.service';
import { Espaces } from 'src/model/Espaces';
import { routes } from 'src/app/core/helpers/routes/routes';
import { Router, Event as RouterEvent, NavigationEnd } from '@angular/router';
import { SidebarService } from 'src/app/service/sidebar.service';
import { CommonService } from 'src/app/service/common.service';
import { url } from 'src/app/shared/models/header.model';

@Component({
  selector: 'app-list-espaces',
  templateUrl: './list-espaces.component.html',
  styleUrls: ['./list-espaces.component.scss']
})
export class ListEspacesComponent implements OnInit {
  espaces: Espaces[] = [];
  isLoading = true;
  error: string | null = null;
  filteredEspaces: Espaces[] = [];
  filterDisponibilite: string = 'all'; // 'all', 'available', 'not-available'
  minPrice: number | null = null;
  maxPrice: number | null = null;

  // Variables pour la barre latérale et les routes
  showMiniSidebar = false;
  public base = '';
  public page = '';
  public last = '';
  public routes = routes;
  public tittle = 'Espaces';
  public strokeValue = 0;
  public progress = 0;
  public firstHeader = false;
  public hideFooter = false;

  constructor(
    private router: Router,
    private sidebar: SidebarService,
    private common: CommonService,
    private espacesService: EspacesService
  ) {
    // Gestion des changements de route
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.getroutes(event);
      }
    });

    // Gestion de la barre latérale
    this.sidebar.toogleSidebar.subscribe((res: string) => {
      this.showMiniSidebar = res === 'true';
    });
  }

  ngOnInit(): void {
    this.calculateScrollPercentage();
    this.fetchEspaces();
  }

  //add button to reserve the space
  reserveEspace(espaceId: any): void {
    this.router.navigate([routes.reservateEspace , espaceId]);
  }

  // Charger la liste des espaces
  private async fetchEspaces(): Promise<void> {
    try {
      const espacesObservable = await this.espacesService.getAllEspaces();
      espacesObservable.subscribe(
        (data: Espaces[]) => {
          this.espaces = data;
          this.filteredEspaces = [...this.espaces]; // Initialiser avec tous les espaces
          this.isLoading = false;
        },
        (error) => {
          this.error = 'Failed to load espaces';
          console.error('Error fetching espaces:', error);
          this.isLoading = false;
        }
      );
    } catch (error) {
      console.error('Error in fetchEspaces:', error);
      this.isLoading = false;
    }
  }

  // Fonction pour gérer le défilement de la page
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
  /*filterByDisponibilite(): void {
    if (this.filterDisponibilite === 'available') {
      this.filteredEspaces = this.espaces.filter(espace => espace.disponibilite);
    } else if (this.filterDisponibilite === 'not-available') {
      this.filteredEspaces = this.espaces.filter(espace => !espace.disponibilite);
    } else {
      this.filteredEspaces = [...this.espaces]; // Afficher tous les espaces si "Tous" est sélectionné
    }
  }*/
  filterEspaces(): void {
    this.filteredEspaces = this.espaces.filter(espace => {
      const isAvailable =
        this.filterDisponibilite === 'all' ||
        (this.filterDisponibilite === 'available' && espace.disponibilite) ||
        (this.filterDisponibilite === 'not-available' && !espace.disponibilite);

      const isWithinPriceRange =
        (!this.minPrice || espace.tarif >= this.minPrice) &&
        (!this.maxPrice || espace.tarif <= this.maxPrice);

      return isAvailable && isWithinPriceRange;
    });
  }
  // Fonction pour récupérer les informations de route
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
        this.tittle = 'Espaces';
        break;
    }

    // Cacher le header sur certaines pages
    this.firstHeader = ![
      routes.home2, routes.home3, routes.home4,
      routes.home5, routes.home6, routes.home7,
      routes.home8, routes.home9
    ].includes(route.url);

    this.hideFooter = [routes.listingmaplist, routes.listingmapgrid].includes(route.url);
  }
}
