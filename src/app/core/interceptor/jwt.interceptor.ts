import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add auth header with jwt if account is logged in and request is to the api url
    let token: string = localStorage.getItem('accessToken');
    let isLoggedIn: Boolean;
    this._authService
      .getSessionValidity()
      .subscribe((res) => (isLoggedIn = res));

    const isApiUrl = request.url.startsWith(environment.ApiBaseUrl);

    console.log(isLoggedIn, 'isLoggedIn');
    if (isLoggedIn && isApiUrl && token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }
    return next.handle(request);
  }
}
