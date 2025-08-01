import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { OwnerPetServiceImpl } from './owner-pet.service';

describe('OwnerPetServiceImpl', () => {
  let service: OwnerPetServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    service = TestBed.inject(OwnerPetServiceImpl);
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
