import { TestBed } from '@angular/core/testing';

import { CustomAdapterService } from './custom-adapter.service';

describe('CustomAdapterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomAdapterService = TestBed.get(CustomAdapterService);
    expect(service).toBeTruthy();
  });
});
