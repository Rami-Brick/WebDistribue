import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared/shared.module";
import {ListEspaceBackComponent} from "./list-espace-back.component";
import {espaceListRoutingModule} from "./espace-routing.module";
import {UpdateEspaceComponent} from "../update-espace/update-espace.component";

@NgModule({
  declarations: [
    ListEspaceBackComponent
  ],
  imports: [
    CommonModule,
    FormsModule,espaceListRoutingModule,
    SharedModule
  ]
})
export class EspaceListModule { }
