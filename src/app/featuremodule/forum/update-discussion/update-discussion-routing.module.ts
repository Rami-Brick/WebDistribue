import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateDiscussionComponent } from './update-discussion.component';

const routes: Routes = [{ path: '', component: UpdateDiscussionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateDiscussionRoutingModule { }
