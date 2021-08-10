import { TestBed } from '@angular/core/testing';

import { CustomDateParserFormatterService } from './custom-date-parser-formatter.service';

describe('CustomDateParserFormatterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomDateParserFormatterService = TestBed.get(CustomDateParserFormatterService);
    expect(service).toBeTruthy();
  });
});
