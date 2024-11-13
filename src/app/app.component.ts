import { Component, OnInit } from '@angular/core';
import { KeycloakConfigServiceService } from './service/keycloak-config-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private keycloakConfigService : KeycloakConfigServiceService

  ) {}
  async ngOnInit() {
    await this.keycloakConfigService.init();
  }



}
