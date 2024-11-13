import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProduitComponent} from "./produit.component";
import {ProduitRoutingModule} from "./produit-routing.module";
import {SharedModule} from "../../shared/shared/shared.module";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import { DialogComponentComponent } from './dialog-component/dialog-component.component';



@NgModule({
  declarations: [
ProduitComponent,
DialogComponentComponent,
  ],
  imports: [
    CommonModule,
    ProduitRoutingModule,
    SharedModule,
    CommonModule,

    MatDialogModule,
    FormsModule,

  ]
})
export class ProduitModuleModule { }
