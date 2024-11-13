/*import {Component, OnInit} from '@angular/core';
import {Espaces} from "../../../model/Espaces";
import {Event as RouterEvent, NavigationEnd, Router} from "@angular/router";
import {SidebarService} from "../../service/sidebar.service";
import {CommonService} from "../../service/common.service";
import {EspacesService} from "../../service/Espaces/espaces.service";
import {url} from "../../shared/models/header.model";
*/
import { Component, OnInit } from '@angular/core';
import { EspacesService } from 'src/app/service/Espaces/espaces.service';
import { Espaces } from 'src/model/Espaces';
import { routes } from 'src/app/core/helpers/routes/routes';
import { Router, Event as RouterEvent, NavigationEnd } from '@angular/router';
import { SidebarService } from 'src/app/service/sidebar.service';
import { CommonService } from 'src/app/service/common.service';
import { url } from 'src/app/shared/models/header.model';
import {Observable} from "rxjs";
@Component({
  selector: 'app-list-espace-back',
  templateUrl: './list-espace-back.component.html',
  styleUrls: ['./list-espace-back.component.scss']
})
export class ListEspaceBackComponent  implements OnInit{
  espaces: Espaces[] = [];
  filteredEspaces: Espaces[] = [];
  filterDisponibilite: string = 'all'; // 'all', 'available', 'not-available'

  isLoading = true;
  error: string | null = null;

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

  // Charger la liste des espaces
  /*private async fetchEspaces(): Promise<void> {
    try {
      const espacesObservable = await this.espacesService.getAllEspaces();
      espacesObservable.subscribe(
        (data: Espaces[]) => {
          this.espaces = data;
          this.isLoading = false;
        },
        (error) => {
          this.error = 'Failed to load espaces';
          console.error('Error fetching espaces:', error);
          this.isLoading = false;
        }
      );
    } catch (error) {
      this.error = 'An unexpected error occurred';
      console.error('Error in fetchEspaces:', error);
      this.isLoading = false;
    }

  }

*/
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
  /*onEditButtonClick(id: number | undefined): void {
    if (id) {
      console.log('Bouton Modifier cliqué, ID:', id);
    } else {
      console.error('Erreur : ID non défini');
    }
  }
*/
  onEditButtonClick(id: number | undefined): void {
    if (id) {
      console.log('Bouton Modifier cliqué, ID:', id);
      this.router.navigate(['/updateespace', id]);
    } else {
      console.error('Erreur : ID non défini');
    }
  }

  filterByDisponibilite(): void {
    if (this.filterDisponibilite === 'available') {
      this.filteredEspaces = this.espaces.filter(espace => espace.disponibilite);
    } else if (this.filterDisponibilite === 'not-available') {
      this.filteredEspaces = this.espaces.filter(espace => !espace.disponibilite);
    } else {
      this.filteredEspaces = [...this.espaces]; // Afficher tous les espaces si "Tous" est sélectionné
    }
  }
  onDeleteButtonClick(id: number | undefined): void {
    if (id !== undefined) {
      const confirmation = confirm('Êtes-vous sûr de vouloir supprimer cet espace ?');
      if (confirmation) {
        this.espacesService.deleteEspace(id).then(
          (response) => {
            response.subscribe(
              () => {
                console.log(`Espace avec l'ID ${id} supprimé`);
                // Rafraîchir la liste après suppression
                this.fetchEspaces();
              },
              (error) => {
                console.error('Erreur lors de la suppression de l\'espace', error);
              }
            );
          }
        );
      }
    } else {
      console.error('Erreur : ID non défini');
    }
  }


}
