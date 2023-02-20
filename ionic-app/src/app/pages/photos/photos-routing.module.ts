import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotosPage } from './photos.page';

const routes: Routes = [
  {
    path: '',
    component: PhotosPage,
  },
  {
    path: ':id',
    loadChildren: () => import('./photo-item/photo-item.module').then((m) => m.PhotoItemPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotosPageRoutingModule {}
