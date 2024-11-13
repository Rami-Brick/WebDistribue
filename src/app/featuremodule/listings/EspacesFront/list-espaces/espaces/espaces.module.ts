import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEspacesComponent } from 'src/app/featuremodule/listings/EspacesFront/list-espaces/list-espaces.component' ;

import { EspacesService } from 'src/app/service/Espaces/espaces.service';
import { ListingsRoutingModule } from 'src/app/featuremodule/listings/listings-routing.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { RouterModule ,Routes} from '@angular/router';
import { EspaceRoutingModule } from 'src/app/featuremodule/listings/EspacesFront/list-espaces/espaces/Espace-routing.module';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [ListEspacesComponent],
  imports: [CommonModule, EspaceRoutingModule,HttpClientModule, SharedModule],
  providers: [EspacesService]
})
export class EspacesModule {


 }
