import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Favorite, Picture } from '../models/picture';

@Injectable({
  providedIn: 'root',
})
export class PictureService {
  private favoritePictures: Favorite[] = []; // No need to make it as Subject because we need only in one place

  constructor(private http: HttpClient) {}

  getPictures(page: number, limit = 24): Observable<Picture[]> {
    // At the first time the number of pictures should equal 18 to occupy the full height of the screen and allow scrolling to work correctly
    return this.http.get<Picture[]>(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
    // Did not add any delays here because it is already real API
  }

  getPictureById(id: string): Observable<Picture> {
    return this.http.get<Picture>(`https://picsum.photos/id/${id}/info`);
  }

  getFavoritePictures(): Favorite[] {
    return this.favoritePictures;
  }

  saveToFavorites(picture: Favorite): void {
    this.favoritePictures.push(picture);
  }

  removeFromFavorites(id: string): void {
    const pictureIndex = this.favoritePictures.findIndex((picture) => picture.id === id);
    this.favoritePictures.splice(pictureIndex, 1);
  }
}
