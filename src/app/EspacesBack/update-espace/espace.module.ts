import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared/shared.module";
import {UpdateEspaceComponent} from "../update-espace/update-espace.component";
import {espaceUpdateRoutingModule} from "./espace-routing.module";

@NgModule({
  declarations: [
   UpdateEspaceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,espaceUpdateRoutingModule,
    SharedModule
  ]
})
export class EspaceUpdateModule { }
