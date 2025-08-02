import { Component } from '@angular/core';

@Component({
  selector: 'app-title',
  template: `<ng-content />`,
  host: {
    class: 'text-2xl font-medium leading-tight',
  },
})
export class Title {}
