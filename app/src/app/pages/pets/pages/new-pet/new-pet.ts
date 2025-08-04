import { Component, effect, inject } from '@angular/core';
import {
  CREATE_PET_SERVICE,
  CreatePetDto,
  PetForm,
} from '../../../../features/pets';
import { TOOLBAR_SERVICE } from '../../../../services';

@Component({
  selector: 'app-new-pet',
  imports: [PetForm],
  template: ` <app-pet-form mode="create" (onSubmit)="createPet($event)" /> `,
})
export class NewPet {
  readonly #toolbarService = inject(TOOLBAR_SERVICE);
  readonly #createPetService = inject(CREATE_PET_SERVICE);

  constructor() {
    effect((cleanup) => {
      this.#toolbarService.title.set('NEW_PET.TITLE');

      cleanup(() => this.#toolbarService.reset());
    });
  }

  protected createPet(pet: Partial<CreatePetDto>) {
    this.#createPetService.create(pet as CreatePetDto);
  }
}
