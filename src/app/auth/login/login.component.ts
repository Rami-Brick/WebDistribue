import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import {KeycloakService} from "../../service/keycloak.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public routes = routes;
  public Toggledata = true;

  constructor(public router:Router, public keycloakService: KeycloakService) {}

  async ngOnInit(): Promise<void> {
    await this.keycloakService.init();
    await this.keycloakService.login();
  }
  path(){
    this.router.navigate([routes.dashboard])
  }
  iconLogle() {
    this.Toggledata = !this.Toggledata;
  }
}
