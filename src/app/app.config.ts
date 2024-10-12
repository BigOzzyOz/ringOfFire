import {
  ApplicationConfig,
  importProvidersFrom
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

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(),
    importProvidersFrom(provideFirebaseApp(() => initializeApp({
      "projectId": "ring-of-fire-66f7b",
      "appId": "1:93805992206:web:90278457fa84c61ba15f5f",
      "storageBucket": "ring-of-fire-66f7b.appspot.com",
      "apiKey": "AIzaSyDPD4WJU891fQJv7z_G3wXqk5GrC4LdfRk",
      "authDomain": "ring-of-fire-66f7b.firebaseapp.com",
      "messagingSenderId": "93805992206"
    }))), importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideDatabase(() => getDatabase()))
  ]
};