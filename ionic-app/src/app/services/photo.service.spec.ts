import { TestBed } from '@angular/core/testing';

import { PictureService } from './picture.service';

describe('PhotoService', () => {
  let service: PictureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PictureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
