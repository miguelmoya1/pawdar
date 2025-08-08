import { NgOptimizedImage } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  forwardRef,
  signal,
  viewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-image-form',
  imports: [NgOptimizedImage, FormsModule],
  host: { class: 'block' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageForm),
      multi: true,
    },
  ],
  template: `
    <div
      class="w-64 h-64 flex items-center justify-center relative"
      (click)="openFilePicker()"
    >
      <img class="rounded-full" priority fill [ngSrc]="preview()" />
    </div>

    <div class="flex flex-col items-center justify-center">
      <input
        #fileInput
        type="file"
        accept="image/*"
        class="hidden"
        (change)="onFileChange($event)"
      />
    </div>
  `,
})
export class ImageForm implements ControlValueAccessor {
  readonly #disabled = signal(false);
  protected readonly fileInput =
    viewChild.required<ElementRef<HTMLInputElement>>('fileInput');

  readonly #currentValue = signal<string | File | null>(null);

  protected readonly preview = computed(() => {
    const value = this.#currentValue();

    if (value instanceof File) {
      return URL.createObjectURL(value);
    }

    if (typeof value === 'string') {
      return value;
    }

    return '/imgs/profile.png';
  });

  #onChange: (file: File | null) => void = () => {};
  #onTouched: () => void = () => {};

  protected openFilePicker() {
    if (this.#disabled()) {
      return;
    }

    this.fileInput()?.nativeElement.click();
  }

  protected onFileChange(event: Event) {
    if (this.#disabled()) {
      return;
    }

    this.#onTouched();

    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.#currentValue.set(file);
      this.#onChange(file);
    } else {
      this.#currentValue.set(null);
      this.#onChange(null);
    }
  }

  writeValue(_obj: any) {
    this.#currentValue.set(_obj);
  }

  registerOnChange(_fn: any) {
    this.#onChange = _fn;
  }

  registerOnTouched(_fn: any) {
    this.#onTouched = _fn;
  }

  setDisabledState?(_isDisabled: boolean) {
    this.#disabled.set(_isDisabled);
  }
}
