import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {KeycloakGuard} from "../auth/keycloak.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./featuremodule/featuremodule.module').then(m => m.FeaturemoduleModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [KeycloakGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },



  {
    path: 'espaces',
    loadChildren: () => import('./featuremodule/listings/EspacesFront/list-espaces/espaces/espaces.module').then(m => m.EspacesModule)
  }

   ,{
    path: 'ListespacesBack',
    loadChildren: () => import('./EspacesBack/list-espace-back/espace.module').then(m => m.EspaceListModule)
  },

   {
    path: 'createespaces',
    loadChildren: () => import('./EspacesBack/create-espace/espace.module').then(m => m.EspacecreateModule)
  }
  ,



  {
    path: 'error',
    loadChildren: () => import('./error/error.module').then(m => m.ErrorModule),
  },
  { path: 'UpdateDiscussion', loadChildren: () => import('./featuremodule/forum/update-discussion/update-discussion.module').then(m => m.UpdateDiscussionModule) },
  { path: 'Commentaire', loadChildren: () => import('./featuremodule/forum/commentaire/commentaire.module').then(m => m.CommentaireModule) },
  {
    path: '**',
    redirectTo: '/error/error404',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
