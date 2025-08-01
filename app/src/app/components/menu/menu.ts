import { Component, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-menu',
  imports: [MatIcon],
  template: `
    <nav
      class="flex items-center justify-around bg-gray-50/5 p-4 text-gray-600"
    >
      @for (link of links(); track link.icon) {
        <div class="flex flex-col items-center gap-2">
          <mat-icon class="material-icons-outlined">{{ link.icon }}</mat-icon>
          <span>{{ link.label }}</span>
        </div>
      }
    </nav>
  `,
})
export class Menu {
  protected readonly links = signal([
    { icon: 'home', label: 'Home' },
    { icon: 'add_box', label: 'Publish' },
    { icon: 'person', label: 'Profile' },
  ]);
}
