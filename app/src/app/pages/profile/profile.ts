import { Component, effect, inject } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { AUTH_SERVICE } from '../../features/auth';
import { OWNER_PET_SERVICE } from '../../features/pets';
import { TOOLBAR_SERVICE } from '../../services';
import { OwnedPets } from './components/owned-pets/owned-pets';
import { UserProfile } from './components/user-profile/user-profile';

@Component({
  selector: 'app-missing-pets',
  imports: [UserProfile, OwnedPets, MatProgressBar],
  template: `
    <div class="flex flex-col p-4 @container">
      @if (userResource.hasValue()) {
        <app-user-profile [user]="userResource.value()" />
      }

      <hr class="mt-4 text-gray-500/20" />

      @if (petsResource.isLoading()) {
        <mat-progress-bar mode="indeterminate" />
      }

      @if (petsResource.hasValue()) {
        <app-owned-pets [pets]="petsResource.value()" />
      }
    </div>
  `,
  host: {
    class: 'block mx-6',
  },
})
export class Profile {
  readonly #toolbarService = inject(TOOLBAR_SERVICE);
  readonly #petsService = inject(OWNER_PET_SERVICE);
  readonly #authService = inject(AUTH_SERVICE);

  protected readonly petsResource = this.#petsService.pets;
  protected readonly userResource = this.#authService.user;

  constructor() {
    effect((cleanup) => {
      this.#toolbarService.title.set('Profile');
      this.#toolbarService.showBackButton.set(false);

      cleanup(() => {
        this.#toolbarService.reset();
      });
    });
  }
}
