import { Component, input } from '@angular/core';
import { PetEntity } from '../../entities/pet.entity';

@Component({
  selector: 'app-pet-card',
  imports: [],
  template: `
        @let petTemplate = pet();
        <img class="w-full" src="{{ petTemplate.imagesUrl[0] }}" alt="{{ petTemplate.name }}">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{{ petTemplate.name }}</div>
          <p class="text-gray-700 text-base">
            {{ petTemplate.description }}
          </p>
        </div>
  `,
  host: {
    class: "max-w-sm rounded overflow-hidden shadow-lg"
  }
})
export class PetCard {
  public readonly pet = input.required<PetEntity>();
}
