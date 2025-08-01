import { Routes } from '@angular/router';

const MISSING_PETS_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Missing Pets',
    loadComponent: () => import('../missing-pets').then((m) => m.MissingPets),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

export default MISSING_PETS_ROUTES;
