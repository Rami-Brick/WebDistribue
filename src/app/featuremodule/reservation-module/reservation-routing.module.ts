import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReservationModuleComponent} from "./reservation-module.component";
import {ReservationEspaceComponent} from "./reservation-espace/reservation-espace.component";

const routes: Routes = [
  {
    path: '',
    component: ReservationModuleComponent,
  },


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationRoutingModule {}
