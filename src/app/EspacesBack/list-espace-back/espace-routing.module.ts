import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListEspaceBackComponent} from "./list-espace-back.component";
import {UpdateEspaceComponent} from "../update-espace/update-espace.component";

const routes: Routes = [
  { path: '', component: ListEspaceBackComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class espaceListRoutingModule { }
