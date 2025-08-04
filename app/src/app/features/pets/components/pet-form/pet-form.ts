import { Component, input, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { PET_TYPE } from '../../../../constants/pet_type';
import { CreatePetDto } from '../../dto/create-pet.dto';

@Component({
  selector: 'app-pet-form',
  imports: [MatButton, TranslatePipe, ReactiveFormsModule],
  template: `
    <form (ngSubmit)="submit()" [formGroup]="form">
      <div [formGroup]="form" class="flex flex-wrap items-end gap-4 px-4 py-3">
        <label class="flex flex-col min-w-40 flex-1">
          <input
            placeholder="{{ 'PET_FORM.NAME' | translate }}"
            class="flex w-full flex-1 resize-none overflow-hidden rounded-lg border border-gray-200 p-4 text-base font-normal leading-normal"
            formControlName="name"
          />
        </label>
      </div>

      <div class="flex flex-wrap items-end gap-4 px-4 py-3">
        <label class="flex flex-col min-w-40 flex-1">
          <select
            class="flex w-full flex-1 resize-none overflow-hidden rounded-lg border border-gray-200 p-4 text-base font-normal leading-normal"
            formControlName="type"
          >
            @for (type of petOptions; track type) {
              <option [value]="type">
                {{ type | translate }}
              </option>
            }
          </select>
        </label>
      </div>

      <div class="flex flex-wrap items-end gap-4 px-4 py-3">
        <label class="flex flex-col min-w-40 flex-1">
          <input
            placeholder="{{ 'PET_FORM.IMAGE' | translate }}"
            class="flex w-full flex-1 resize-none overflow-hidden rounded-lg border border-gray-200 p-4 text-base font-normal leading-normal"
            formControlName="image"
          />
        </label>
      </div>

      <div class="flex flex-wrap items-end gap-4 px-4 py-3">
        <label class="flex flex-col min-w-40 flex-1">
          <textarea
            placeholder="{{ 'PET_FORM.DESCRIPTION' | translate }}"
            class="flex w-full flex-1 resize-none overflow-hidden rounded-lg border border-gray-200 p-4 text-base font-normal leading-normal"
            formControlName="description"
          ></textarea>
        </label>
      </div>

      <div class="flex flex-wrap items-end gap-4 px-4 py-3">
        <label class="flex flex-col min-w-40 flex-1">
          <input
            placeholder="{{ 'PET_FORM.LOCATION' | translate }}"
            class="flex w-full flex-1 resize-none overflow-hidden rounded-lg border border-gray-200 p-4 text-base font-normal leading-normal"
            formControlName="location"
          />
        </label>
      </div>

      <div class="flex justify-center px-4 py-3">
        <button matButton>
          <span class="truncate">
            @switch (mode()) {
              @case ('edit') {
                {{ 'PET_FORM.EDIT' | translate }}
              }
              @case ('create') {
                {{ 'PET_FORM.CREATE' | translate }}
              }
            }
          </span>
        </button>
      </div>
    </form>
  `,
})
export class PetForm {
  public readonly mode = input.required<'create' | 'edit'>();
  public readonly onSubmit = output<Partial<CreatePetDto>>();
  public readonly defaultValue = input();

  protected readonly form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    type: new FormControl<PET_TYPE>(PET_TYPE.DOG, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    image: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    location: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  protected readonly petOptions = Object.values(PET_TYPE);

  protected submit() {
    if (!this.form.valid) {
      return;
    }

    const petData = this.form.getRawValue();

    this.onSubmit.emit({
      name: petData.name,
      type: petData.type,
      imagesUrl: [petData.image],
      description: petData.description,
    });
  }
}
