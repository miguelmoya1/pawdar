import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Info } from './info';

describe('Info', () => {
  let component: Info;
  let fixture: ComponentFixture<Info>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Info],
    }).compileComponents();

    fixture = TestBed.createComponent(Info);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('label', 'Test Label');
    fixture.componentRef.setInput('description', 'Test Description');
    fixture.componentRef.setInput('imageUrl', 'https://example.com/image.jpg');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
