import { Component, computed, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { PetEntity } from '../../entities/pet.entity';

@Component({
  selector: 'app-pet-card',
  imports: [MatButton, TranslatePipe, MatIcon],
  template: `
    @let petTemplate = pet();

    <div class="flex items-center justify-between w-full">
      <div class="p-4">
        <h2 class="text-2xl font-semibold text-gray-800">
          {{ petTemplate.name }}
        </h2>

        <p class="mt-2 text-gray-600">{{ petTemplate.description }}</p>
      </div>

      <img
        class="w-24 h-24 object-cover rounded-full"
        [src]="imagesUrl()"
        [alt]="petTemplate.name"
      />
    </div>

    <div class="flex items-center justify-end gap-4 w-full">
      <button matButton>
        <mat-icon> pets </mat-icon>
        {{ 'PET_CARD.I_FOUND_PET' | translate }}
      </button>
    </div>
  `,
  host: {
    class: 'flex flex-col gap-2 rounded-xl border p-2 border-gray-200',
  },
})
export class PetCard {
  public readonly pet = input.required<PetEntity>();

  protected readonly imagesUrl = computed(
    () => this.pet().imagesUrl?.[0] || 'imgs/sad.png',
  );
}
