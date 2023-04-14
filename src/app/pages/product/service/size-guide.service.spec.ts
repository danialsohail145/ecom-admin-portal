import { TestBed } from '@angular/core/testing';

import { SizeGuideService } from './size-guide.service';

describe('SizeGuideService', () => {
  let service: SizeGuideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SizeGuideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
