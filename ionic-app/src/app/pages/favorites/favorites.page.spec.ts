import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

import { FavoritesPage } from './favorites.page';
import { PictureService } from '../../shared/services/picture.service';

describe('FavoritesPage', () => {
  let component: FavoritesPage;
  let fixture: ComponentFixture<FavoritesPage>;

  const pictureServiceMock = {
    getFavoritePictures: () => [],
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritesPage],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: PictureService,
          useValue: pictureServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get favorites pictures onInit', () => {
    const spy = spyOn(pictureServiceMock, 'getFavoritePictures');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should navigate to photos/:id', inject([Router], (routerMock: Router) => {
    const spy = spyOn(routerMock, 'navigate').and.stub();
    component.seePictureDetails('1');
    expect(spy.calls.first().args[0]).toEqual(['/photos/1']);
  }));
});
