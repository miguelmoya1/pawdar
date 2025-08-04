import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnedPets } from './owned-pets';

describe('OwnedPets', () => {
  let component: OwnedPets;
  let fixture: ComponentFixture<OwnedPets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnedPets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnedPets);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
