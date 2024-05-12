import { TestBed } from '@angular/core/testing';

import { WhistDataService } from './whist-data.service';

describe('WhistDataService', () => {
  let service: WhistDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhistDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
