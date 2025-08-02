import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { beforeEach, describe, expect, it } from 'vitest';
import { Menu } from './menu';

describe('Menu', () => {
  let component: Menu;
  let fixture: ComponentFixture<Menu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menu],
      providers: [
        provideTranslateService(),
        provideZonelessChangeDetection(),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Menu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have three links', () => {
    const links = fixture.nativeElement.querySelectorAll('.flex-col');
    expect(links.length).toBe(3);
  });

  it('should display the correct icons and labels', () => {
    const links = fixture.nativeElement.querySelectorAll('.flex-col');
    const icons = ['home', 'add_box', 'person'];
    const labels = ['MENU.PETS', 'MENU.PUBLISH', 'MENU.PROFILE'];

    links.forEach((link: HTMLElement, index: number) => {
      const icon = link.querySelector('mat-icon');
      const label = link.querySelector('span');

      expect(icon?.textContent?.trim()).toBe(icons[index]);
      // We are just checking the existence of the translate pipe output for now
      expect(label?.textContent?.trim()).toBe(labels[index]);
    });
  });
});
