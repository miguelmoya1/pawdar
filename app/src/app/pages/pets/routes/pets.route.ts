import { Routes } from '@angular/router';

const PETS_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'missing',
  },
  {
    path: 'new',
    title: 'New Pet',
    loadComponent: () =>
      import('../pages/new-pet/new-pet').then((m) => m.NewPet),
  },
  {
    path: 'missing',
    title: 'Missing Pets',
    loadComponent: () =>
      import('../pages/missing-pets/missing-pets').then((m) => m.MissingPets),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

export default PETS_ROUTES;
