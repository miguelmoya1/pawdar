import { Component, effect, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { TranslatePipe } from '@ngx-translate/core';
import { Info } from '../../components/impl/info/info';
import { PET_SERVICE, PetCard } from '../../features/pets';
import { TOOLBAR_SERVICE } from '../../services';

@Component({
  selector: 'app-missing-pets',
  imports: [MatProgressBar, PetCard, MatButton, TranslatePipe, Info],
  template: `
    @if (petsResource.isLoading()) {
      <mat-progress-bar mode="indeterminate" />
    }

    @if (petsResource.hasValue()) {
      @for (pet of petsResource.value(); track pet.uid) {
        <app-pet-card [pet]="pet" />
      } @empty {
        <app-info
          label="{{ 'MISSING_PETS.EMPTY_PETS' | translate }}"
          description="{{ 'MISSING_PETS.EMPTY_PETS_DESCRIPTION' | translate }}"
          imageUrl="imgs/happy.png"
        />
      }
    }

    @if (petsResource.error()) {
      <div class="flex flex-col items-center gap-6">
        <app-info
          label="{{ 'MISSING_PETS.ERROR_LOAD_PETS' | translate }}"
          description="{{
            'MISSING_PETS.ERROR_LOAD_PETS_DESCRIPTION' | translate
          }}"
          imageUrl="imgs/sad.png"
        />
        <button matButton>
          <span class="truncate">{{ 'MISSING_PETS.RETRY' | translate }}</span>
        </button>
      </div>
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

      cleanup(() => {
        this.#toolbarService.reset();
      });
    });
  }
}
