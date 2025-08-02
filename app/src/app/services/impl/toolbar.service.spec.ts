import { TestBed } from '@angular/core/testing';

import { ToolbarServiceImpl } from './toolbar.service';

describe('ToolbarServiceImpl', () => {
  let service: ToolbarServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolbarServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
