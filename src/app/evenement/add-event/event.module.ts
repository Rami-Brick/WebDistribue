import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared/shared.module";
import { AddEventComponent } from './add-event.component';
import { ListEventComponent } from '../list-event/list-event.component';
import { eventModulerouting } from './event-routing.module';

@NgModule({
  declarations: [
    AddEventComponent,
    //ListEventComponent
  ],
  imports: [
    CommonModule,
    FormsModule,eventModulerouting,
    SharedModule
  ]
})
export class eventModule { }