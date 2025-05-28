import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { photoReducer } from '../store/photo-store/photo-store.reducer';
import { provideEffects } from '@ngrx/effects';
import { PhotoEffects } from '../store/photo-store/photo-store.effects';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ photos: photoReducer }),
    provideEffects([PhotoEffects])
  ]
};
