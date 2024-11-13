import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from 'src/app/shared/shared/shared.module';
import {MyListingComponent} from "../../featuremodule/userpages/my-listing/my-listing.component";
import {MyListingRoutingModule} from "./forum-list-routing.module";


@NgModule({
  declarations: [
    MyListingComponent
  ],
  imports: [
    CommonModule,
    MyListingRoutingModule,
    SharedModule
  ]
})
export class MyListingModule { }
