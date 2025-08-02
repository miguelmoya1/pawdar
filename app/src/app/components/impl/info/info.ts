import { Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-info',
  imports: [TranslatePipe],
  template: `
    <div class="flex flex-col items-center gap-6">
      @if (imageUrl()) {
        <div
          class="bg-center bg-no-repeat aspect-video bg-cover rounded-xl w-full max-w-[360px]"
          [style.background-image]="imageStyle()"
        ></div>
      }
      <div class="flex flex-col items-center gap-2">
        <p
          class="text-lg font-bold leading-tight tracking-[-0.015em] text-center"
        >
          {{ 'MISSING_PETS.EMPTY_PETS' | translate }}
        </p>
        <p class="text-sm font-normal leading-normal text-center max-w-96">
          {{ 'MISSING_PETS.EMPTY_PETS_DESCRIPTION' | translate }}
        </p>
      </div>
    </div>
  `,
})
export class Info {
  public readonly label = input.required<string>();
  public readonly description = input.required<string>();

  public readonly imageUrl = input<string>();

  protected readonly imageStyle = computed(() => {
    return `url('${this.imageUrl()}')`;
  });
}
