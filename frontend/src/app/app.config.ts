import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {JwtModule} from "@auth0/angular-jwt";
import {provideEnvironmentNgxMask} from "ngx-mask";

export function tokenGetter() {
  return localStorage.getItem("token");
}

export const appConfig = {
  providers: [
    provideRouter(routes),
    provideEnvironmentNgxMask(),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        headerName: 'Authorization',
      },
    })),
  ],
};
