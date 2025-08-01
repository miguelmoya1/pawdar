import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'missing-pets',
  },
  {
    path: 'missing-pets',
    loadChildren: () =>
      import('./pages/missing-pets/routes/missing-pets.route'),
  },
  {
    path: '**',
    redirectTo: 'missing-pets',
    pathMatch: 'full',
  },
];
