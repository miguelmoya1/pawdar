import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { TranslatePipe } from '@ngx-translate/core';
import { TOOLBAR_SERVICE } from '../../../services';

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbar, MatIcon, TranslatePipe],
  template: `
    <mat-toolbar class="!pt-10 !pb-10">
      @if (showBackButton()) {
        <button
          matIconButton
          class="example-icon"
          aria-label="Example icon-button with menu icon"
          (click)="goBack()"
        >
          <mat-icon>arrow_back</mat-icon>
        </button>
      }

      <span class="flex-[1_1_auto]"></span>

      <h2 class="text-lg !font-medium leading-tight">
        {{ title() | translate }}
      </h2>

      <span class="flex-[1_1_auto]"></span>

      @for (extraButton of extraButtons(); track extraButton.icon) {
        <button mat-icon-button>
          <mat-icon>{{ extraButton.icon }}</mat-icon>
        </button>
      }
    </mat-toolbar>
  `,
})
export class Toolbar {
  readonly #toolbar = inject(TOOLBAR_SERVICE);

  readonly title = this.#toolbar.title;
  readonly showBackButton = this.#toolbar.showBackButton;
  readonly extraButtons = this.#toolbar.extraButtons;

  protected goBack() {
    history.back();
  }
}
