import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection
} from '@angular/core';
import {
  provideRouter
} from '@angular/router';
import {
  routes
} from './app.routes';
import {
  provideAnimationsAsync
} from '@angular/platform-browser/animations/async';
import {
  initializeApp,
  provideFirebaseApp
} from '@angular/fire/app';
import {
  getFirestore,
  provideFirestore
} from '@angular/fire/firestore';
import {
  getAuth,
  provideAuth
} from '@angular/fire/auth';
import {
  getDatabase,
  provideDatabase
} from '@angular/fire/database';
import {
  environment
} from '../environments/environment.development';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebase))),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideDatabase(() => getDatabase()))
  ]
};