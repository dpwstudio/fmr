import { TestBed } from '@angular/core/testing';

import { ProgressiveImgService } from './progressive-img.service';

describe('ProgressiveImgService', () => {
  let service: ProgressiveImgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressiveImgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
