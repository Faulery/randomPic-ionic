import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { PictureService } from './picture.service';
import { StorageService } from './storage.service';

describe('PictureService', () => {
  let service: PictureService;
  let http: HttpClient;

  const storageServiceMock = {
    set: () => {},
    get: () => {
      return [
        {
          id: '1',
          imageUrl: 'url',
        },
      ];
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: StorageService,
          useValue: storageServiceMock,
        },
      ],
    });
    service = TestBed.inject(PictureService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http.get with the correct URL', fakeAsync(() => {
    const httpSpy = spyOn(http, 'get').and.callThrough();
    const page = 1;
    const limit = 24;
    service.getPictures(page, limit).subscribe(() => {});
    expect(httpSpy).toHaveBeenCalledWith(
      `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
    );
    tick(500);
  }));

  it('should call http.get to get picture by id', fakeAsync(() => {
    const httpSpy = spyOn(http, 'get').and.callThrough();
    service.getPictureById('1').subscribe(() => {});
    expect(httpSpy).toHaveBeenCalledWith(`https://picsum.photos/id/1/info`);
    tick(500);
  }));

  it('should save a picture to favorites', () => {
    service.saveToFavorites({
      id: '1',
      imageUrl: 'url',
    });
    const favorites = service.getFavoritePictures();
    expect(favorites).toEqual([{ id: '1', imageUrl: 'url' }]);
  });

  it('should get from storage pictures', () => {
    const getSpy = spyOn(storageServiceMock, 'get').and.callThrough();
    const storedPictures = service.getFavoritePictures();
    expect(getSpy).toHaveBeenCalled();
    expect(storedPictures).toEqual([
      {
        id: '1',
        imageUrl: 'url',
      },
    ]);
  });

  it('should remove from favorites selected picture', () => {
    const favorites = service.getFavoritePictures();
    service.removeFromFavorites('1');
    expect(favorites).toEqual([]);
  });
});
