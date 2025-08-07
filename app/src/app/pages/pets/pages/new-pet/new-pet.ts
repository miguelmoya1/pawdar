import { Component, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  CREATE_PET_SERVICE,
  CreatePetDto,
  OWNER_PET_SERVICE,
  PetForm,
} from '../../../../features/pets';
import { TOOLBAR_SERVICE } from '../../../../services';

@Component({
  selector: 'app-new-pet',
  imports: [PetForm],
  template: `
    <app-pet-form
      mode="create"
      (onSubmit)="createPet($event)"
      [disabled]="disableForm()"
    />
  `,
})
export class NewPet {
  readonly #toolbarService = inject(TOOLBAR_SERVICE);
  readonly #createPetService = inject(CREATE_PET_SERVICE);
  readonly #ownerPetService = inject(OWNER_PET_SERVICE);
  readonly #router = inject(Router);

  protected readonly disableForm = signal(false);

  constructor() {
    effect((cleanup) => {
      this.#toolbarService.title.set('NEW_PET.TITLE');

      cleanup(() => this.#toolbarService.reset());
    });
  }

  protected async createPet(pet: Partial<CreatePetDto>) {
    this.disableForm.set(true);

    try {
      await this.#createPetService.create(pet as CreatePetDto);

      this.#ownerPetService.reload();

      await this.#router.navigate(['/profile']);
    } finally {
      this.disableForm.set(false);
    }
  }
}
