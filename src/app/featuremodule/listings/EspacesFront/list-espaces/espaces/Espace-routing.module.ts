import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEspacesComponent } from 'src/app/featuremodule/listings/EspacesFront/list-espaces/list-espaces.component' ;  

const routes: Routes = [{ path: '', component: ListEspacesComponent }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspaceRoutingModule { }
