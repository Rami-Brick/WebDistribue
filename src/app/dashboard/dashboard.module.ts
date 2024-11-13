import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeDashboardComponent } from './home-dashboard.component';
import {DashboardRoutingModule} from "./dashboard-routing.module";



@NgModule({
  declarations: [
    HomeDashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
