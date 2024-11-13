import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateEspaceComponent} from "./create-espace.component";
import {espaceRoutingModule} from "./espace-routing.module";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared/shared.module";

@NgModule({
  declarations: [
    CreateEspaceComponent
  ],
  imports: [
    CommonModule,
    espaceRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class EspacecreateModule { }
