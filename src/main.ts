import "@angular/platform-browser";
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";

if (environment.production) {
  enableProdMode();
}

Promise.resolve().then(() => platformBrowserDynamic().bootstrapModule(AppModule))
    .catch(err => console.error('Handle bootstrap level error', err));
