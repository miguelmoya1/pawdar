import { TestBed } from '@angular/core/testing';

import { AuthServiceImpl } from './auth-service';

describe('AuthServiceImpl', () => {
  let service: AuthServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
