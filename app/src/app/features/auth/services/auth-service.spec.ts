import { TestBed } from '@angular/core/testing';

import { provideZonelessChangeDetection } from '@angular/core';
import { AuthServiceImpl } from './auth-service';

describe('AuthServiceImpl', () => {
  let service: AuthServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    service = TestBed.inject(AuthServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
