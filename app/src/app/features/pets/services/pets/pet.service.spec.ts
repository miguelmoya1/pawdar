import { TestBed } from '@angular/core/testing';

import { PetServiceImpl } from './pet.service';

describe('PetServiceImpl', () => {
  let service: PetServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('pets', () => {
    it('should return a Resource of PetEntity array', () => {
      const petsResource = service.pets;
      expect(petsResource).toBeDefined();
      expect(petsResource.value).toBeInstanceOf(Array);
    });
  });
});
