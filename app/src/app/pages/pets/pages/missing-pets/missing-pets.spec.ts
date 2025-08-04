import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingPets } from './missing-pets';

describe('MissingPets', () => {
  let component: MissingPets;
  let fixture: ComponentFixture<MissingPets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissingPets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissingPets);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
