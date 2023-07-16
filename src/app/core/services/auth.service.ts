import { Injectable } from '@angular/core';
import {
  AuthenticationDetails,
  CognitoAccessToken,
  CognitoIdToken,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Observer, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: CognitoUser;

  constructor(
    private _router: Router,
    private _accountService: AccountService
  ) {}

  poolData = {
    UserPoolId: environment.cognitoUserPoolId,
    ClientId: environment.cognitoAppClientId,
  };

  getUserPool(): CognitoUserPool {
    return new CognitoUserPool(this.poolData);
  }

  authenticate(
    username: string,
    password: string
  ): Observable<CognitoUserSession> {
    const userPool = this.getUserPool();
    const authDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });
    const userData = {
      Username: username,
      Pool: userPool,
    };

    this.user = new CognitoUser(userData);

    return Observable.create((observer: Observer<any>) => {
      this.user.authenticateUser(authDetails, {
        onSuccess: (result) => {
          observer.next(result);
          const accessToken = result.getAccessToken().getJwtToken();
          localStorage.setItem('accessToken', accessToken);
          // const idToken: any = result.idToken.jwtToken;
          /* Use the idToken for Logins Map when Federating User Pool
           with identity pools or when passing through an Authorization Header
           to an API Gateway Authorizer*/
        },

        onFailure: (err) => observer.error(err),
        mfaRequired: (challengeName, challengeParameters) => {
          return observer.error('MFA :D');
          // cognitoUser.sendMFACode(confirmationCode, {
          //     onSuccess: result => this.onLoginSuccess(callback, result),
          //     onFailure: err => this.onLoginError(callback, err)
          // });
        },
      });
    });
  }

  /*
    getCurrentUser returns a Cognito user object if user is signed in
    or null-value if there is no current user
  */
  getCurrentUser(): Observable<CognitoUser | null> {
    return of(this.getUserPool().getCurrentUser());
  }

  getSessionValidity(): Observable<boolean> {
    const user: CognitoUser = this.getUserPool().getCurrentUser();

    if (user) {
      return Observable.create((observer: Observer<any>) => {
        user.getSession((err, session) => {
          if (err) {
            return observer.error(err);
          }
          observer.next(session.isValid());
        });
      });
    } else {
      return of(false);
    }
  }

  getAccessToken(): Observable<CognitoAccessToken> {
    const user: CognitoUser = this.getUserPool().getCurrentUser();

    if (user) {
      return Observable.create((observer: Observer<any>) => {
        user.getSession((err, session: CognitoUserSession) => {
          if (err) {
            return observer.error(err);
          }
          observer.next(session.getAccessToken());
        });
      });
    } else {
      return throwError(null);
    }
  }

  signOut(): void {
    const user: CognitoUser = this.getUserPool().getCurrentUser();
    if (user != null) {
      user.signOut();
      localStorage.clear();
      this._accountService.accountSubject.next(null);
      this._router.navigate(['login']);
    }
  }

  /*
    TODO:
    Error: User is not authenticated
    https://github.com/amazon-archives/amazon-cognito-identity-js/issues/71
  */
  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.user.changePassword(
        'Testing12345!',
        'Testing1234!',
        (err, result) => {
          if (err) {
            return observer.error(err);
          }
          observer.next(result);
        }
      );
    });
  }
}
