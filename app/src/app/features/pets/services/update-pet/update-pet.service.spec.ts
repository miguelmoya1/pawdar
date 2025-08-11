import { TestBed } from '@angular/core/testing';

import { UpdatePetService } from './update-pet.service';

describe('UpdatePetService', () => {
  let service: UpdatePetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatePetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
