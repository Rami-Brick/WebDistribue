import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReservationModuleComponent} from "./reservation-module.component";
import {ReservationRoutingModule} from "./reservation-routing.module";
import {SharedModule} from "../../shared/shared/shared.module";
import { ReservationEspaceComponent } from './reservation-espace/reservation-espace.component';
import {ReservationDetailsComponent} from "./reservation-details/reservation-details.component";
import { ConfirmReservationComponent } from './confirm-reservation/confirm-reservation.component';



@NgModule({
  declarations: [
    ReservationModuleComponent,
    ReservationEspaceComponent,
    ReservationDetailsComponent,
    ConfirmReservationComponent

  ],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    SharedModule,
  ]
})
export class ReservationModuleModule { }
