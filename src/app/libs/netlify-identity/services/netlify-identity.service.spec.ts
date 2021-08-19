import { TestBed } from '@angular/core/testing';

import { NetlifyIdentityService } from './netlify-identity.service';

describe('NetlifyIdentityService', () => {
  let service: NetlifyIdentityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetlifyIdentityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
