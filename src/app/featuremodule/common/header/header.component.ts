import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { SidebarService } from 'src/app/service/sidebar.service';
import { header, url } from 'src/app/shared/models/header.model';
import { KeycloakService, KeycloakEventType } from 'keycloak-angular';
import { KeycloakConfigServiceService } from "../../../service/keycloak-config-service.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public routes = routes;
  public nav = true;
  public isLoggedIn = false;
  public userProfile: any = null;
  header: header[] = [];
  base = '';
  page = '';
  last = '';

  constructor(
    private data: DataService,
    private router: Router,
    private sidebarService: SidebarService,
    private keycloakService: KeycloakService,
    private cdr: ChangeDetectorRef,
    private keycloakConfigService: KeycloakConfigServiceService
  ) {
    this.header = this.data.header;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.getroutes(event);
      }
    });
  }

  async ngOnInit() {
    console.log("Initializing HeaderComponent...");

    // Subscribe to authentication status changes
    this.keycloakConfigService.isAuthenticated$.subscribe(async (isAuthenticated) => {
      this.isLoggedIn = isAuthenticated;
      if (isAuthenticated) {
        this.userProfile = await this.keycloakService.loadUserProfile();
        console.log("User profile loaded:", this.userProfile);
      } else {
        this.userProfile = null; // Reset profile if not authenticated
      }
      this.cdr.detectChanges(); // Trigger change detection
    });

    // Initial check for authentication status
    this.isLoggedIn = await this.keycloakService.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloakService.loadUserProfile();
    }
  }

  private getroutes(route: url): void {
    const splitVal = route.url.split('/');
    this.base = splitVal[1];
    this.page = splitVal[2];
    this.last = splitVal[3];
    this.nav = this.base !== 'userpages';
  }

  login(): void {
    this.keycloakService.login().then(() => {
      // No need to redirect, the header will update automatically
    }).catch((error) => {
      console.error('Keycloak login error:', error);
    });
  }

  signup(): void {
    this.keycloakService.register().catch((error) => {
      console.error('Keycloak registration error:', error);
    });
  }

  logout(): void {
    this.keycloakConfigService.logout();
  }

  public toggleSidebar(): void {
    this.sidebarService.openSidebar();
  }

  public hideSidebar(): void {
    this.sidebarService.closeSidebar();
  }
}
