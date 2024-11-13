import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ForumComponent} from "./forum.component";

const routes: Routes = [
  {
    path: '',
    component: ForumComponent,
    children: [
      {
        path: 'add-discussion',
        loadChildren: () =>
          import('./add-discussion/add-discussion.module').then(
            (m) => m.AddDiscussionModule
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumRoutingModule { }
