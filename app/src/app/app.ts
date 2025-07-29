import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AUTH_SERVICE } from './features/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('pawdar');
  protected readonly authService = inject(AUTH_SERVICE);

  protected readonly isLogged = this.authService.isLogged;

  protected login() {
    this.authService.loginGoogle();
  }

  protected logout() {
    this.authService.logout();
  }
}
