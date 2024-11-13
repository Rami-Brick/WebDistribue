
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UpdateEspaceComponent} from "../update-espace/update-espace.component";
import {ListEspaceBackComponent} from "../list-espace-back/list-espace-back.component";

const routes: Routes = [
  { path: '', component: UpdateEspaceComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class espaceUpdateRoutingModule { }

