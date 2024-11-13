import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturemoduleComponent } from './featuremodule.component';
import {ReservationEspaceComponent} from "./reservation-module/reservation-espace/reservation-espace.component";
import {ReservationDetailsComponent} from "./reservation-module/reservation-details/reservation-details.component";
import {ConfirmReservationComponent} from "./reservation-module/confirm-reservation/confirm-reservation.component";

const routes: Routes = [
  {
    path: '',
    component: FeaturemoduleComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home-one',
      },
      {
        path: '',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'updateespace/:id',
        loadChildren: () => import('../EspacesBack/update-espace/espace.module').then(m => m.EspaceUpdateModule)
      }

     ,
      { path: 'addevent', loadChildren: () => import('../evenement/add-event/event.module').then(m => m.eventModule) },
      { path: 'listevent', loadChildren: () => import('../evenement/list-event/event.module').then(m => m.eventModule) },
      {

        path: 'Reservation',
        loadChildren: () =>
          import('../featuremodule/reservation-module/reservation-module.module').then(
            (m) => m.ReservationModuleModule
          ),
      },
      {path:"espace-reservation",
        component:ReservationEspaceComponent
      },
      { path: 'confirm', component: ConfirmReservationComponent },

      {path:"reservationEspace/:id",component:ReservationEspaceComponent},

      {path:"reservationDetails/:id",component:ReservationDetailsComponent},



      {
        path: 'Produit',
        loadChildren: () =>
          import('../featuremodule/produit/produit-module.module').then(
            (m) => m.ProduitModuleModule
          ),
      },

      {path:"espace-reservation",
        component:ReservationEspaceComponent
      },
      {
        path: 'forum',
        loadChildren: () => import('./forum/forum.module').then(m => m.ForumListModule),

      },
      {
        path: 'add-discussion',loadChildren: () => import('./forum/add-discussion/add-discussion.module').then(m => m.AddDiscussionModule)
      },
      {
        path: 'my-discussion',loadChildren: () => import('./forum/my-discussion/my-discussion.module').then(m => m.MyDiscussionModule)
      },

      {
        path: 'updateDiscussion/:id',
        loadChildren: () => import('./forum/update-discussion/update-discussion.module').then(m => m.UpdateDiscussionModule)
      },
      {
        path: 'commentaire/:id',
        loadChildren: () => import('./forum/commentaire/commentaire.module').then(m => m.CommentaireModule)
      },


      {
        path: 'auth',
        loadChildren: () =>
          import('../auth/auth.module').then((m) => m.AuthModule),
      },


      {
        path: 'listings',
        loadChildren: () =>
          import('./listings/listings.module').then((m) => m.ListingsModule),
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'userpages',
        loadChildren: () =>
          import('./userpages/userpages.module').then((m) => m.UserpagesModule),
      },
      {
        path: 'blog',
        loadChildren: () =>
          import('./blog/blog.module').then((m) => m.BlogModule),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('./contact/contact.module').then((m) => m.ContactModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturemoduleRoutingModule {}
