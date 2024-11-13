import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentaireRoutingModule } from './commentaire-routing.module';
import { CommentaireComponent } from './commentaire.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CommentaireComponent
  ],
    imports: [
        CommonModule,
        CommentaireRoutingModule,
        FormsModule
    ]
})
export class CommentaireModule { }
