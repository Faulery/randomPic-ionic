import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PictureService } from '../../services/picture.service';
import { Picture } from '../../models/picture';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.page.html',
  styleUrls: ['./photos.page.scss'],
})
export class PhotosPage implements OnInit, OnDestroy {
  pictures: Picture[] = []; // Some images do not have the same size. Unfortunately did not have the time to align them
  private currentPage = 1;
  private subscription!: Subscription; // This subscription stores a cold observable, so it will be completed after emit, but it is good to do unsubscribe everywhere

  constructor(private photosService: PictureService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadPictures(this.currentPage);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  loadMore(event: any): void {
    this.currentPage++;
    this.loadPictures(this.currentPage, 12, event);
  }

  addToFavorite(picture: Picture): void {
    this.photosService.saveToFavorites({
      id: picture.id,
      imageUrl: picture.download_url,
    });
    this.openSnackBar('Added to favorites!', 'Got it!');
    // Added snackbar just to be more user-friendly and make some notification
  }

  private openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 1500,
    });
  }

  private loadPictures(page: number, limit?: number, event?: InfiniteScrollCustomEvent): void {
    this.subscription = this.photosService.getPictures(page, limit).subscribe({
      next: (pictures: Picture[]) => {
        this.pictures = [...this.pictures, ...pictures]; // I would rather use async pipe instead of make subscription manually but did not have time for that
      },
      complete: () => {
        event?.target.complete();
      },
    });
  }
}
