import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FeaturemoduleComponent} from "../featuremodule/featuremodule.component";
import {HomeDashboardComponent} from "./home-dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: HomeDashboardComponent,
    children: [

    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
