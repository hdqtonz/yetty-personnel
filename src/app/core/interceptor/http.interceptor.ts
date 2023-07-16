import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../services/local-storage.service';
import { LocalStorage } from '../class/local-storage';

@Injectable()
export class HttpInterceptors implements HttpInterceptor {
  constructor(private _localStorageService: LocalStorageService,) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const reqCopy = request.clone({
      headers: request.headers
        .set('Authorization', 'Bearer ' + this._localStorageService.getItem(LocalStorage.AccessToken))
        .set('Content-Type', 'application/json')
        .set('x-api-key', environment.ApiKey),

      params: (request.params ? request.params : new HttpParams()).set(
        'lang',
        localStorage.getItem('locale') || 'en'
      ),
    });

    return next.handle(reqCopy);
  }
}
