import { Component, OnInit } from '@angular/core';
import { EspacesService } from 'src/app/service/Espaces/espaces.service';
import { Espaces } from 'src/model/Espaces';
import {NavigationEnd,  Event as RouterEvent,Router} from '@angular/router';
import {routes} from "../../core/helpers/routes/routes";
import {url} from "../../shared/models/header.model";
import {SidebarService} from "../../service/sidebar.service";
import {CommonService} from "../../service/common.service";

@Component({
  selector: 'app-create-espace',
  templateUrl: './create-espace.component.html',
  styleUrls: ['./create-espace.component.scss']
})
export class CreateEspaceComponent implements OnInit {
  espace: Espaces = {
    nom: '',
    description: '',
    adresse: '',
    latitude: 0,
    longitude: 0,
    capacite: 0,
    tarif: 0,
    disponibilite: true,
    photos: []
  };
  isLoading = true;
  error: string | null = null;

  // Variables pour la barre latérale et les routes
  showMiniSidebar = false;
  public base = '';
  public page = '';
  public last = '';
  public tittle = 'Espaces';
  public strokeValue = 0;
  public progress = 0;
  public firstHeader = false;
  public hideFooter = false;
  protected readonly routes = routes;


  constructor(
    private espacesService: EspacesService,
    private router: Router,
    private sidebar: SidebarService,
    private common: CommonService,
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

    this.createEspace()
  }

  // Fonction pour créer un nouvel espace
  async createEspace(): Promise<void> {
    try {
      this.isLoading = true;
      const createObservable = await this.espacesService.createEspace(this.espace);
      createObservable.subscribe(
        (response) => {
          console.log('Espace créé avec succès:', response);
          this.isLoading = false;
          this.router.navigate(['/createespaces']); // Rediriger vers la liste des espaces
        },
        (error) => {
          this.error = 'Erreur lors de la création de l\'espace';
          console.error('Error creating espace:', error);
          this.isLoading = false;
        }
      );
    } catch (error) {
      this.error = 'Erreur inattendue lors de la création';
      console.error('Error in createEspace:', error);
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
