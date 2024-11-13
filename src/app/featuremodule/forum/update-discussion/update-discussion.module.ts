import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateDiscussionRoutingModule } from './update-discussion-routing.module';
import { UpdateDiscussionComponent } from './update-discussion.component';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatLegacyChipsModule} from "@angular/material/legacy-chips";

@NgModule({
  declarations: [
    UpdateDiscussionComponent
  ],
  imports: [
    CommonModule,
    UpdateDiscussionRoutingModule,
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatLegacyChipsModule
  ]
})
export class UpdateDiscussionModule { }
