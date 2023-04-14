import { TestBed } from '@angular/core/testing';

import { CollectionRealtimeService } from './collection-realtime.service';

describe('CollectionRealtimeService', () => {
  let service: CollectionRealtimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectionRealtimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
