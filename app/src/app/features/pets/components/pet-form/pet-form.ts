import { Component, effect, input, output } from '@angular/core';
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
      <div [formGroup]="form" class="flex flex-col px-4 py-3">
        <label for="name" class="px-1 text-gray-600 text-base">
          {{ 'PET_FORM.NAME' | translate }}
        </label>
        <input
          name="name"
          class="flex w-full flex-1 rounded-lg border border-gray-200 p-4"
          formControlName="name"
          [class.border-red-500]="
            form.get('name')?.invalid && form.get('name')?.touched
          "
        />
        @if (form.get('name')?.invalid && form.get('name')?.touched) {
          <span class="text-red-500 p-1">
            {{ 'PET_FORM.NAME_REQUIRED' | translate }}
          </span>
        }
      </div>

      <div [formGroup]="form" class="flex flex-col px-4 py-3">
        <label for="type" class="px-1 text-gray-600 text-base">
          {{ 'PET_FORM.TYPE' | translate }}
        </label>
        <select
          name="type"
          class="flex w-full flex-1 rounded-lg border border-gray-200 p-4"
          formControlName="type"
          [class.border-red-500]="
            form.get('type')?.invalid && form.get('type')?.touched
          "
        >
          @for (type of petOptions; track type) {
            <option [value]="type">
              {{ type | translate }}
            </option>
          }
        </select>
        @if (form.get('type')?.invalid && form.get('type')?.touched) {
          <span class="text-red-500 p-1">
            {{ 'PET_FORM.TYPE_REQUIRED' | translate }}
          </span>
        }
      </div>

      <div [formGroup]="form" class="flex flex-col px-4 py-3">
        <label for="image" class="px-1 text-gray-600 text-base">
          {{ 'PET_FORM.IMAGE' | translate }}
        </label>
        <input
          name="image"
          class="flex w-full flex-1 rounded-lg border border-gray-200 p-4"
          formControlName="image"
          [class.border-red-500]="
            form.get('image')?.invalid && form.get('image')?.touched
          "
        />
        @if (form.get('image')?.invalid && form.get('image')?.touched) {
          <span class="text-red-500 p-1">
            {{ 'PET_FORM.IMAGE_REQUIRED' | translate }}
          </span>
        }
      </div>

      <div [formGroup]="form" class="flex flex-col px-4 py-3">
        <label for="description" class="px-1 text-gray-600 text-base">
          {{ 'PET_FORM.DESCRIPTION' | translate }}
        </label>
        <textarea
          name="description"
          class="flex w-full flex-1 rounded-lg border border-gray-200 p-4"
          formControlName="description"
          [class.border-red-500]="
            form.get('description')?.invalid && form.get('description')?.touched
          "
        ></textarea>
        @if (
          form.get('description')?.invalid && form.get('description')?.touched
        ) {
          <span class="text-red-500 p-1">
            {{ 'PET_FORM.DESCRIPTION_REQUIRED' | translate }}
          </span>
        }
      </div>

      <div [formGroup]="form" class="flex flex-col px-4 py-3">
        <label for="location" class="px-1 text-gray-600 text-base">
          {{ 'PET_FORM.LOCATION' | translate }}
        </label>
        <input
          name="location"
          class="flex w-full flex-1 rounded-lg border border-gray-200 p-4"
          formControlName="location"
          [class.border-red-500]="
            form.get('location')?.invalid && form.get('location')?.touched
          "
        />
        @if (form.get('location')?.invalid && form.get('location')?.touched) {
          <span class="text-red-500 p-1">
            {{ 'PET_FORM.LOCATION_REQUIRED' | translate }}
          </span>
        }
      </div>

      <div class="flex justify-center px-4 py-3">
        <button
          [disabled]="disabled()"
          matButton
          [disabled]="!form.valid"
          type="submit"
        >
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
  public readonly disabled = input(false);
  public readonly defaultValue = input();

  public readonly onSubmit = output<Partial<CreatePetDto>>();

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

  constructor() {
    effect(() => {
      const defaultValue = this.defaultValue();

      if (defaultValue) {
        this.form.patchValue(defaultValue);
        this.form.markAsPristine();
      }
    });
  }

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
