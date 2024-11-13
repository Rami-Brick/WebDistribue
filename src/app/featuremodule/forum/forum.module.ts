import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared/shared.module';
import {ForumComponent} from "./forum.component";
import {ForumRoutingModule} from "./forum-routing.module";
import {MatCardModule} from "@angular/material/card";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    ForumComponent,

  ],
  imports: [
    CommonModule,
    ForumRoutingModule,
    MatCardModule,
    MatTooltipModule,
    MatIconModule
  ]
})
export class ForumListModule { }
