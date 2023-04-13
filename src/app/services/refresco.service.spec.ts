import { TestBed } from '@angular/core/testing';

import { RefrescoService } from './refresco.service';

describe('RefrescoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RefrescoService = TestBed.get(RefrescoService);
    expect(service).toBeTruthy();
  });
});
