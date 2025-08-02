import { Component, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  imports: [MatIcon, TranslatePipe],
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
  `,
})
export class Menu {
  protected readonly links = signal([
    { icon: 'home', label: 'MENU.PETS' },
    { icon: 'add_box', label: 'MENU.PUBLISH' },
    { icon: 'person', label: 'MENU.PROFILE' },
  ]);
}
