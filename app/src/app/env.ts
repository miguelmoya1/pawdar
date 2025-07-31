import { isDevMode } from '@angular/core';

export const ENV = {
  production: isDevMode(),
  PET_COLLECTION: 'pets',
  USER_COLLECTION: 'users',
};
