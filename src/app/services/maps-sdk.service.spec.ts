import { TestBed } from '@angular/core/testing';

import { MapsSdkService } from './maps-sdk.service';

describe('MapsSdkService', () => {
  let service: MapsSdkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapsSdkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
