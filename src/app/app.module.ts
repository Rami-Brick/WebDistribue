import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { KeycloakAngularModule } from 'keycloak-angular';
import { KeycloakConfigServiceService } from './service/keycloak-config-service.service';
import { HttpTokenInterceptor } from './interceptor/http-token.interceptor';
import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ReservationModuleComponent } from './featuremodule/reservation-module/reservation-module.component';
import { AddEventComponent } from './evenement/add-event/add-event.component';
import { ListEventComponent } from './evenement/list-event/list-event.component';
import { UpdateEventComponent } from './evenement/update-event/update-event.component';

@NgModule({
  declarations: [AppComponent, UpdateEventComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule, // Add this line
    KeycloakAngularModule
  ],
  providers: [
    KeycloakConfigServiceService, // Initialize in service
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
