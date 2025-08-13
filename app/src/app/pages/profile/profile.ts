import { Component, effect, inject } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { AUTH_SERVICE } from '../../features/auth';
import {
  OWNER_PET_SERVICE,
  PET_SERVICE,
  PetEntity,
  UPDATE_PET_SERVICE,
} from '../../features/pets';
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

      @if (ownedPetsResource.isLoading()) {
        <mat-progress-bar mode="indeterminate" />
      }

      @if (ownedPetsResource.hasValue()) {
        <app-owned-pets
          class="mt-4"
          [pets]="ownedPetsResource.value()"
          (onMarkAsMissing)="handleMarkAsMissing($event)"
          (onMarkAsSafe)="handleMarkAsSafe($event)"
          [disabled]="ownedPetsResource.isLoading()"
        />
      }
    </div>
  `,
  host: {
    class: 'block mx-6',
  },
})
export class Profile {
  readonly #toolbarService = inject(TOOLBAR_SERVICE);
  readonly #ownedPetsService = inject(OWNER_PET_SERVICE);
  readonly #petService = inject(PET_SERVICE);
  readonly #authService = inject(AUTH_SERVICE);
  readonly #updatePetService = inject(UPDATE_PET_SERVICE);

  protected readonly ownedPetsResource = this.#ownedPetsService.petsResource;
  protected readonly userResource = this.#authService.userResource;

  constructor() {
    effect((cleanup) => {
      this.#toolbarService.title.set('Profile');
      this.#toolbarService.showBackButton.set(false);

      cleanup(() => {
        this.#toolbarService.reset();
      });
    });
  }

  protected async handleMarkAsSafe(pet: PetEntity) {
    await this.#updatePetService.markAsSafe(pet.uid);

    this.#ownedPetsService.reload();
    this.#petService.reload();
  }

  protected async handleMarkAsMissing(pet: PetEntity) {
    await this.#updatePetService.markAsMissing(pet.uid);

    this.#ownedPetsService.reload();
    this.#petService.reload();
  }
}
