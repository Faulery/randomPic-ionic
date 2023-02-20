import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PictureService } from 'src/app/services/picture.service';
import { Favorite } from '../../models/picture';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favoritePictures: Favorite[] = [];

  constructor(private pictureService: PictureService, private router: Router) {}

  ngOnInit(): void {
    this.favoritePictures = this.pictureService.getFavoritePictures();
  }

  seePictureDetails(id: string): void {
    this.router.navigate([`/photos/${id}`]);
  }
}
