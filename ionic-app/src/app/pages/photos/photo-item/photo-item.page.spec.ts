import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';

import { PhotoItemPage } from './photo-item.page';
import { PictureService } from '../../../shared/services/picture.service';

describe('PhotoItemPage', () => {
  let component: PhotoItemPage;
  let fixture: ComponentFixture<PhotoItemPage>;

  const pictureServiceMock = {
    getPictureById: () => of({}),
    removeFromFavorites: () => {},
  };
  const locationMock = {
    back: () => {},
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoItemPage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '1' }),
            },
          },
        },
        {
          provide: PictureService,
          useValue: pictureServiceMock,
        },
        {
          provide: Location,
          useValue: locationMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get picture by id onInit', () => {
    const spy = spyOn(pictureServiceMock, 'getPictureById');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call pictureService.removeFromFavorites', () => {
    const spy = spyOn(pictureServiceMock, 'removeFromFavorites');
    component.removeFromFavorites();
    expect(spy).toHaveBeenCalled();
  });

  it('should navigate back to /favorites after removing', () => {
    const backSpy = spyOn(locationMock, 'back');
    component.removeFromFavorites();
    expect(backSpy).toHaveBeenCalled();
  });
});
