import { Component, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  imports: [MatIcon, TranslateModule],
  template: `
    <nav
      class="flex items-center justify-around bg-gray-50/5 p-4 text-gray-600"
    >
      @for (link of links(); track link.icon) {
        <div class="flex flex-col items-center gap-2">
          <mat-icon class="material-icons-outlined">{{ link.icon }}</mat-icon>
          <span>{{ link.label | translate }}</span>
        </div>
      }
    </nav>
    <div class="flex justify-center">
      <button (click)="switchLang('en')">English</button>
      <button (click)="switchLang('es')">Español</button>
    </div>
  `,
})
export class Menu {
  protected readonly links = signal([
    { icon: 'home', label: 'MENU.PETS' },
    { icon: 'add_box', label: 'MENU.PUBLISH' },
    { icon: 'person', label: 'MENU.PROFILE' },
  ]);

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
