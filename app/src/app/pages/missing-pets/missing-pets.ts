import { Component, effect, inject } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { PET_SERVICE } from '../../features/pets';
import { TOOLBAR_SERVICE } from '../../services';

@Component({
  selector: 'app-missing-pets',
  imports: [MatProgressBar],
  template: `
    @if (petsResource.isLoading()) {
      <mat-progress-bar mode="indeterminate" />
    }

    @if (petsResource.hasValue()) {
      @for (pet of petsResource.value(); track pet.uid) {
        <!-- <app-pet-card /> -->
      } @empty {
        <p>No pets found</p>
      }
    }

    @if (petsResource.error()) {
      <p>Error loading pets</p>
    }
  `,
  host: {
    class: 'block mx-6',
  },
})
export class MissingPets {
  readonly #toolbarService = inject(TOOLBAR_SERVICE);
  readonly #petsService = inject(PET_SERVICE);

  protected readonly petsResource = this.#petsService.pets;

  constructor() {
    effect((cleanup) => {
      this.#toolbarService.title.set('Missing Pets');
      this.#toolbarService.showBackButton.set(false);

      console.log(this.petsResource.value());

      cleanup(() => {
        this.#toolbarService.reset();
      });
    });
  }
}
