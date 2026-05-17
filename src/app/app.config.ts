import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  DEFAULT_CURRENCY_CODE,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'AED' },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
  ],
};

// import { provideHttpClient } from '@angular/common/http';

// export const appConfig: ApplicationConfig = {
//   providers: [

//     provideHttpClient()
//   ]
// };
