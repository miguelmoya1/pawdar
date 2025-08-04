import { Routes } from '@angular/router';
import { isLoggedFn } from './features/auth';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pets',
  },
  {
    path: 'pets',
    loadChildren: () => import('./pages/pets/routes/pets.route'),
  },
  {
    path: 'profile',
    canMatch: [isLoggedFn],
    loadChildren: () => import('./pages/profile/routes/profile.route'),
  },
  {
    path: '**',
    redirectTo: 'missing-pets',
    pathMatch: 'full',
  },
];
