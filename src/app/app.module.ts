import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppLocalizationInitializationFactory } from './core/initialization/localization/app-localization-initialization.factory';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { HttpInterceptors } from './core/interceptor/http.interceptor';
import { ErrorInterceptor } from './core/interceptor/error.interceptor';
import { AbstractInitializationFactory } from './core/initialization/abstract-initialization.factory';
import { AppLocalizationInitializationService } from './core/initialization/localization/app-localization-initialization.service';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientService } from './core/services/http-client.service';

@NgModule({
  declarations: [AppComponent, MainLayoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: AppLocalizationInitializationFactory.createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    FormsModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptors,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    HttpClientService,
    {
      provide: APP_INITIALIZER,
      useFactory: AbstractInitializationFactory.getInitializationFunction,
      deps: [AppLocalizationInitializationService],
      multi: true,
    },
    { provide: MatDialogRef, useValue: {} },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
