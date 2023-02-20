import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { PhotosPageRoutingModule } from './photos-routing.module';
import { PhotosPage } from './photos.page';

@NgModule({
  imports: [CommonModule, IonicModule, PhotosPageRoutingModule, MatSnackBarModule],
  declarations: [PhotosPage],
})
export class PhotosPageModule {}
