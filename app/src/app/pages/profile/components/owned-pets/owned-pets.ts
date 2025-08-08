import { Component, computed, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Info } from '../../../../components/impl/info/info';
import { Pet } from '../../../../features/pets/entities/pet.entity';

@Component({
  selector: 'app-owned-pets',
  imports: [MatIcon, TranslatePipe, MatButton, Info, RouterLink],
  template: `
    <div class="flex items-center justify-between pb-4">
      <h3 class="text-lg font-bold leading-tight">
        {{ 'OWNED_PETS.MY_PETS' | translate }}
      </h3>

      <button matButton routerLink="/pets/new">
        <mat-icon>add</mat-icon>
        <span class="ml-2">
          {{ 'OWNED_PETS.ADD_PET' | translate }}
        </span>
      </button>
    </div>

    @for (pet of pets(); track pet.uid) {
      <div
        class="flex items-center gap-4 border border-gray-400 rounded-xl px-4 py-2 justify-between"
      >
        <div class="flex items-center gap-4">
          <div
            class="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
            [style.background-image]="'url(' + image() + ')'"
          ></div>

          <div class="flex flex-col justify-center">
            <p class="text-base font-medium leading-normal line-clamp-1">
              {{ pet.name }}
            </p>
            <p
              class="text-[#8a7c60] text-sm font-normal leading-normal line-clamp-2"
            >
              {{ pet.description || 'PROFILE.NO_DESCRIPTION' | translate }}
            </p>
          </div>
        </div>

        <div class="shrink-0">
          <mat-icon>edit</mat-icon>
        </div>
      </div>
    } @empty {
      <app-info
        label="OWNED_PETS.NO_PETS"
        description="OWNED_PETS.NO_PETS_DESCRIPTION"
        imageUrl="imgs/sad.png"
      />
    }
  `,
})
export class OwnedPets {
  public readonly pets = input.required<Pet[]>();

  protected readonly image = computed(() => {
    const pet = this.pets();

    return pet.length > 0 ? pet[0].imagesUrl[0] : 'imgs/sad.png';
  });
}
