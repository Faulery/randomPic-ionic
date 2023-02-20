import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Picture } from '../../../models/picture';
import { PictureService } from 'src/app/services/picture.service';

@Component({
  selector: 'app-photo-item',
  templateUrl: './photo-item.page.html',
  styleUrls: ['./photo-item.page.scss'],
})
export class PhotoItemPage implements OnInit {
  pictureDetails$!: Observable<Picture>;
  private pictureId!: string;

  constructor(
    private route: ActivatedRoute,
    private pictureService: PictureService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pictureDetails$ = this.pictureService.getPictureById(id);
      this.pictureId = id;
    }
  }

  removeFromFavorites(): void {
    this.pictureService.removeFromFavorites(this.pictureId);
    this.location.back();
  }
}
