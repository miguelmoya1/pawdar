import { Routes } from '@angular/router';

const PROFILE_ROUTES: Routes = [
  {
    path: '',
    title: 'Profile',
    loadComponent: () => import('../profile').then((m) => m.Profile),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

export default PROFILE_ROUTES;
