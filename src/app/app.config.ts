import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideAppInitializer, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { definePreset } from '@primeng/themes';

import { routes } from './app.routes';
import { provideAppTranslate } from './core/i18n/translate.providers';
import { LanguageService } from './core/services/language.service';

const BmrpPuntagordaPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#e8f1ff',
      100: '#d6e6ff',
      200: '#a8ccff',
      300: '#75adff',
      400: '#3d8cff',
      500: '#002d62',
      600: '#002147',
      700: '#001a38',
      800: '#001433',
      900: '#000d22',
      950: '#000a1a',
    },
    colorScheme: {
      light: {
        primary: {
          color: '#002d62',
          contrastColor: '#ffffff',
          hoverColor: '#002147',
          activeColor: '#001a38',
        },
        highlight: {
          background: '#e8f1ff',
          focusBackground: '#d6e6ff',
          color: '#002d62',
          focusColor: '#002d62',
        },
      },
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimationsAsync(),
    provideRouter(routes),
    ...provideAppTranslate(),
    providePrimeNG({
      theme: {
        preset: BmrpPuntagordaPreset,
        options: {
          darkModeSelector: false,
          cssLayer: false,
        },
      },
    }),
    provideAppInitializer(() => {
      inject(LanguageService).init();
    }),
  ],
};
