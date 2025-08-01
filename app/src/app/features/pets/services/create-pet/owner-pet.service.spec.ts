import { TestBed } from '@angular/core/testing';
import { OwnerPetServiceImpl } from './create-pet.service';

describe('OwnerPetServiceImpl', () => {
  let service: OwnerPetServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerPetServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('create', () => {
    it('should have a create function', () => {
      expect(service.create).toBeDefined();
    });
  });
});
