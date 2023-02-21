import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Favorite, Picture } from '../models/picture';
import { StorageService } from './storage.service';
import { STORAGE_KEY } from '../enums/storage';

@Injectable({
  providedIn: 'root',
})
export class PictureService {
  private favoritePictures: Favorite[] = []; // No need to make it as Subject because we need only in one place

  constructor(private http: HttpClient, private storageService: StorageService) {}

  getPictures(page: number, limit = 24): Observable<Picture[]> {
    // At the first time the number of pictures should equal 18 to occupy the full height of the screen and allow scrolling to work correctly
    return this.http
      .get<Picture[]>(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
      .pipe(delay(this.imitateDelay()));
  }

  getPictureById(id: string): Observable<Picture> {
    return this.http.get<Picture>(`https://picsum.photos/id/${id}/info`);
  }

  getFavoritePictures(): Favorite[] {
    if (this.favoritePictures.length > 0) {
      return this.favoritePictures;
    } else {
      const storedValue: Favorite[] = this.storageService.get(STORAGE_KEY.FAVORITE_PICS);
      this.favoritePictures = storedValue ? storedValue : [];
      return storedValue;
    }
  }

  saveToFavorites(picture: Favorite): void {
    this.favoritePictures.push(picture);
    this.updateStorage(STORAGE_KEY.FAVORITE_PICS, this.favoritePictures);
  }

  removeFromFavorites(id: string): void {
    const pictureIndex = this.favoritePictures.findIndex((picture) => picture.id === id);
    this.favoritePictures.splice(pictureIndex, 1);
    this.updateStorage(STORAGE_KEY.FAVORITE_PICS, this.favoritePictures);
  }

  private updateStorage(key: string, value: any): void {
    this.storageService.set(key, value);
  }

  private imitateDelay(min = 200, max = 300): number {
    const diff = max - min;
    let random = Math.floor(Math.random() * diff);
    return random + min;
  }
}
