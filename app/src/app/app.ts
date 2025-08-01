import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Menu } from './components/menu/menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menu],
  template: `
    <div
      class="grid grid-rows-[1fr_auto] md:grid-rows-[auto_1fr] h-full"
    >
      <main>
        <router-outlet />
      </main>
      <app-menu class="md:row-start-1" />
    </div>
  `,
  host: {
    class: 'block h-full w-full',
  },
})
export class App {
  protected readonly title = signal('pawdar');

  readonly #translate = inject(TranslateService);

  constructor() {
    this.#translate.addLangs(['en', 'es']);
    this.#translate.setFallbackLang('en');
    this.#translate.use('en');
  }
}
