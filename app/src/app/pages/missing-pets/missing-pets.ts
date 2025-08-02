import { Component, effect, inject } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { TranslatePipe } from '@ngx-translate/core';
import { Title } from '../../components';
import { PET_SERVICE } from '../../features/pets';
import { TOOLBAR_SERVICE } from '../../services';

@Component({
  selector: 'app-missing-pets',
  imports: [Title, TranslatePipe, MatProgressBar],
  template: `
    <app-title> {{ 'MISSING_PETS.MISSING_PETS' | translate }} </app-title>

    @if (petsResource.isLoading()) {
      <mat-progress-bar mode="indeterminate" />
    }

    @if (petsResource.hasValue()) {
      @for (pet of petsResource.value(); track pet.uid) {
        <!-- <app-pet-card *ngFor="let pet of petsResource.value()" /> -->
      } @empty {
        <p>No pets found</p>
      }
    }

    @if (petsResource.error()) {
      <p>Error loading pets</p>
    }
  `,
  host: {
    class: 'px-6',
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

      console.log(this.petsResource.error());

      cleanup(() => {
        this.#toolbarService.reset();
      });
    });
  }
}
