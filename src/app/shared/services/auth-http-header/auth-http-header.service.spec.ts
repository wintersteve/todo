import { TestBed } from '@angular/core/testing';

import { AuthHttpHeaderService } from './auth-http-header.service';

describe('AuthHttpHeaderService', () => {
  let service: AuthHttpHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthHttpHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
