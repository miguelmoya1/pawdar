import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Menu, Toolbar } from './components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menu, Toolbar],
  template: `
    <div
      class="grid grid-rows-[auto_1fr_auto] h-full md:grid-rows-[auto_auto_1fr]"
    >
      <app-toolbar />
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
