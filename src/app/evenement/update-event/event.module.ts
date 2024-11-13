import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared/shared.module";
import { AddEventComponent } from '../add-event/add-event.component';
import { UpdateEventComponent } from '../update-event/update-event.component';
import { eventModulerouting } from './event-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UpdateEventComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    eventModulerouting,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, 
    MatDialogModule,
    ReactiveFormsModule,
    CommonModule,
    eventModulerouting,
    SharedModule,
    CommonModule,

    MatDialogModule,
    FormsModule,
]
})
export class eventModule { }