import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyDiscussionComponent } from './my-discussion.component';

const routes: Routes = [{ path: '', component: MyDiscussionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyDiscussionRoutingModule { }
