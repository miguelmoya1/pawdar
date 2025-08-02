import { InjectionToken, WritableSignal } from '@angular/core';
import { ToolbarServiceImpl } from './toolbar.service';

export type ExtraButtons = {
  icon: string;
  onClick?: () => void;
};

export interface ToolbarService {
  readonly title: WritableSignal<string>;
  readonly showBackButton: WritableSignal<boolean>;
  readonly extraButtons: WritableSignal<ExtraButtons[]>;

  reset(): void;
}

export const TOOLBAR_SERVICE = new InjectionToken<ToolbarService>(
  'TOOLBAR_SERVICE',
  {
    providedIn: 'root',
    factory: () => new ToolbarServiceImpl(),
  },
);
