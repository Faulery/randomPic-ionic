import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

import { PhotosPage } from './photos.page';
import { PictureService } from '../../shared/services/picture.service';

describe('PhotosPage', () => {
  let component: PhotosPage;
  let fixture: ComponentFixture<PhotosPage>;

  const pictureServiceMock = {
    getPictures: () => of(mockedRes),
    saveToFavorites: (picture: any) => {},
  };
  const matSnackBackMock = {
    open: () => {},
  };
  const mockedRes = [
    {
      id: '1',
      author: 'Author',
      width: 100,
      height: 100,
      url: '',
      download_url: '',
    },
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PhotosPage],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: PictureService,
          useValue: pictureServiceMock,
        },
        {
          provide: MatSnackBar,
          useValue: matSnackBackMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call pictureService.getPictures onInit', () => {
    const spy = spyOn(pictureServiceMock, 'getPictures').and.callThrough();
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call retrieve data from API and get pictures', fakeAsync(() => {
    component.pictures = [];
    component.ngOnInit();
    pictureServiceMock.getPictures().subscribe((data) => {
      expect(component.pictures).toEqual(data);
    });
    tick();
  }));

  it('should add to favorites selected picture', () => {
    const selectedPicture = { ...mockedRes[0] };
    const spy = spyOn(pictureServiceMock, 'saveToFavorites');
    component.addToFavorite(selectedPicture);
    expect(spy).toHaveBeenCalledWith({
      id: selectedPicture.id,
      imageUrl: selectedPicture.download_url,
    });
  });

  it('should snack bar on picture selected', () => {
    const selectedPicture = { ...mockedRes[0] };
    const spy = spyOn(matSnackBackMock, 'open');
    component.addToFavorite(selectedPicture);
    expect(spy).toHaveBeenCalled();
  });

  it('should load more pictures', () => {
    const spy = spyOn(pictureServiceMock, 'getPictures').and.callThrough();
    component.pictures = [];
    component.loadMore(null);
    expect(spy).toHaveBeenCalled();
  });
});
