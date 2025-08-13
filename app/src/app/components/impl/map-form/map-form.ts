import {
  Component,
  effect,
  ElementRef,
  forwardRef,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Map } from 'leaflet';

@Component({
  selector: 'app-map-form',
  imports: [],
  host: { class: 'block' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MapForm),
      multi: true,
    },
  ],
  template: ` <div id="map"></div> `,
})
export class MapForm implements ControlValueAccessor {
  readonly #disabled = signal(false);
  protected readonly mapContainer =
    viewChild.required<ElementRef<HTMLDivElement>>('map');

  #map: Map | undefined;

  readonly #currentValue = signal<string | File | null>(null);

  #onChange: (file: File | null) => void = () => {};
  #onTouched: () => void = () => {};

  constructor() {
    effect(() => {
      const mapContainer = this.mapContainer()?.nativeElement;
      if (mapContainer) {
        this.#map = new Map(mapContainer);
        this.#map.setZoom(13);
      }
    });
  }

  protected onPositionChange(event: Event) {
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
