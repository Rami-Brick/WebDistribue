import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyDiscussionRoutingModule } from './my-discussion-routing.module';
import { MyDiscussionComponent } from './my-discussion.component';
import {MatSortModule} from "@angular/material/sort";
import {ReactiveFormsModule} from "@angular/forms";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";


@NgModule({
  declarations: [
    MyDiscussionComponent
  ],
  imports: [
    CommonModule,
    MyDiscussionRoutingModule,
    MatSortModule,
    ReactiveFormsModule,
    SweetAlert2Module
  ]
})
export class MyDiscussionModule { }
