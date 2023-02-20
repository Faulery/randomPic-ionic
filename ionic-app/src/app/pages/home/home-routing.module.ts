import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'photos',
  },
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'favorites',
        loadChildren: () =>
          import('../favorites/favorites.module').then((m) => m.FavoritesPageModule),
      },
      {
        path: 'photos',
        loadChildren: () => import('../photos/photos.module').then((m) => m.PhotosPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
