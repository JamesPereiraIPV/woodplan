import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

registerLocaleData(localePt, 'pt-PT');

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi())
  ],
}).catch(err => console.error(err));
