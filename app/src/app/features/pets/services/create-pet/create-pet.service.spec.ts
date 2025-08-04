import { TestBed } from '@angular/core/testing';
import { CreatePetServiceImpl } from './create-pet.service';

describe('CreatePetServiceImpl', () => {
  let service: CreatePetServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatePetServiceImpl);
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
