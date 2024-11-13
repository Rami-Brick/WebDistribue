import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from "../../../shared/shared/shared.module";
import {AddDiscussionRoutingModule} from "./add-discussion-routing.module";
import {AddDiscussionComponent} from "./add-discussion.component";
import {MatLegacyChipsModule} from "@angular/material/legacy-chips";
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule} from "@angular/material/autocomplete";


@NgModule({
  declarations: [
    AddDiscussionComponent
  ],
  imports: [
    CommonModule,
    AddDiscussionRoutingModule,
    SharedModule,
    MatLegacyChipsModule,
    MatIconModule,
    MatAutocompleteModule
  ]
})
export class AddDiscussionModule { }
