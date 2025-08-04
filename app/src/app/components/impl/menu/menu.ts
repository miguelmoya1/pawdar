import { Component, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  imports: [MatIcon, TranslatePipe, RouterLink, RouterLinkActive],
  template: `
    <nav
      class="flex items-center justify-around bg-gray-50/5 p-4 text-gray-600"
    >
      @for (link of links(); track link.icon) {
        <div class="flex flex-col items-center gap-2" [routerLink]="link.href">
          <mat-icon
            #icon
            [class.material-icons-outlined]="
              !icon._elementRef.nativeElement.classList.contains('not-outlined')
            "
            routerLinkActive="not-outlined"
          >
            {{ link.icon }}
          </mat-icon>
          <span>{{ link.label | translate }}</span>
        </div>
      }
    </nav>
  `,
})
export class Menu {
  protected readonly links = signal([
    { icon: 'cruelty_free', label: 'MENU.PETS', href: 'pets/missing' },
    // { icon: 'add_box', label: 'MENU.PUBLISH', href: '/publish-pet' },
    { icon: 'person', label: 'MENU.PROFILE', href: '/profile' },
  ]);
}
