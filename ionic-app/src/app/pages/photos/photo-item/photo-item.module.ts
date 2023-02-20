import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { PhotoItemPage } from './photo-item.page';

const routes: Routes = [
  {
    path: '',
    component: PhotoItemPage,
  },
];

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule.forChild(routes)],
  declarations: [PhotoItemPage],
})
export class PhotoItemPageModule {}
