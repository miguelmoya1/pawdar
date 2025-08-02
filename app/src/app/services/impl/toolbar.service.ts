import { Injectable, signal } from '@angular/core';
import { ExtraButtons, ToolbarService } from './toolbar.service.contract';

@Injectable({
  providedIn: 'root',
})
export class ToolbarServiceImpl implements ToolbarService {
  readonly #defaultTitle = 'Pawdar';

  public readonly title = signal(this.#defaultTitle);
  public readonly showBackButton = signal(true);

  public readonly extraButtons = signal<ExtraButtons[]>([]);

  reset() {
    this.title.set(this.#defaultTitle);
    this.showBackButton.set(true);
    this.extraButtons.set([]);
  }
}
