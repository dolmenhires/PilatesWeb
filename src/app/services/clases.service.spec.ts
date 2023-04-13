import { TestBed } from '@angular/core/testing';

import { ClasesService } from './clases.service';

describe('ClasesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClasesService = TestBed.get(ClasesService);
    expect(service).toBeTruthy();
  });
});
