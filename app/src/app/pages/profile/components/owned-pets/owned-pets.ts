import { Component, input, model, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Info } from '../../../../components';
import { PetEntity } from '../../../../features/pets';

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

    <div class="flex flex-col gap-4">
      @for (pet of pets(); track pet.uid) {
        <div
          class="flex items-center gap-4 rounded-xl border p-2 border-gray-200 justify-between"
        >
          <div class="flex items-center gap-4">
            <div
              class="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
              [style.background-image]="'url(' + getImage($index) + ')'"
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
            @if (pet.isMissing()) {
              <button
                matButton
                (click)="handleMarkAsSafe(pet)"
                [disabled]="disabled()"
              >
                <span class="truncate">
                  {{ 'OWNED_PETS.MARK_AS_SAFE' | translate }}
                </span>
                <mat-icon> check_circle </mat-icon>
              </button>
            }
            @if (pet.isSafe()) {
              <button
                matButton
                (click)="handleMarkAsMissing(pet)"
                [disabled]="disabled()"
              >
                <span class="truncate">
                  {{ 'OWNED_PETS.MARK_AS_MISSING' | translate }}
                </span>
                <mat-icon> report_problem </mat-icon>
              </button>
            }
            <button matButton (click)="handleEdit(pet)" [disabled]="disabled()">
              <span class="truncate">
                {{ 'OWNED_PETS.EDIT_PET' | translate }}
              </span>
              <mat-icon> edit </mat-icon>
            </button>
          </div>
        </div>
      } @empty {
        <app-info
          label="OWNED_PETS.NO_PETS"
          description="OWNED_PETS.NO_PETS_DESCRIPTION"
          imageUrl="imgs/sad.png"
        />
      }
    </div>
  `,
})
export class OwnedPets {
  public readonly disabled = model<boolean>(false);
  public readonly pets = input.required<PetEntity[]>();
  public readonly onMarkAsSafe = output<PetEntity>();
  public readonly onMarkAsMissing = output<PetEntity>();
  public readonly onEdit = output<PetEntity>();

  protected getImage(index: number) {
    const pet = this.pets()[index];
    return pet.imagesUrl?.length > 0 ? pet.imagesUrl[0] : 'imgs/sad.png';
  }

  protected handleMarkAsSafe(pet: PetEntity) {
    this.disabled.set(true);
    this.onMarkAsSafe.emit(pet);
  }

  protected handleMarkAsMissing(pet: PetEntity) {
    this.disabled.set(true);
    this.onMarkAsMissing.emit(pet);
  }

  protected handleEdit(pet: PetEntity) {
    this.disabled.set(true);
    this.onEdit.emit(pet);
  }
}
