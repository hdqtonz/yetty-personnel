import { Injectable } from '@angular/core';
import { profileAPIEndpoints } from '../class/endpoints/profile';
import { PasswordChangeRequest } from '../interface/PasswordChangeRequest';
import { Profile } from '../interface/Profile';
import { ProfileUpdateRequest } from '../interface/ProfileUpdateRequest';
import { HttpClientService } from './http-client.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { LocalStorage } from '../class/local-storage';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public accountSubject: BehaviorSubject<any>;
  public account: Observable<any>;

  constructor(
    private _http: HttpClientService,
    private _localStorageService: LocalStorageService
  ) {
    let user = _localStorageService.getItem(LocalStorage.User);
    this.accountSubject = new BehaviorSubject<any>(JSON.parse(user));
    this.account = this.accountSubject.asObservable();
  }

  public get accountValue(): Profile {
    return this.accountSubject.value;
  }

  getLoggedInUserProfile() {
    return this._http
      .get<Profile>(`${profileAPIEndpoints._getLoggedInUserProfile}`)
      .pipe(
        map((profile: any) => {
          this.accountSubject.next(profile);
          this._localStorageService.setItem(
            LocalStorage.User,
            JSON.stringify(profile)
          );
          return profile;
        })
      );
  }

  updateLoggedInUserProfile(reqBody: ProfileUpdateRequest) {
    return this._http.put(
      `${profileAPIEndpoints._updateLoggedInUserProfile}`,
      reqBody
    );
  }

  setLoggedInUserPassword(reqBody: PasswordChangeRequest) {
    return this._http.put(
      `${profileAPIEndpoints._setLoggedInUserPassword}`,
      reqBody
    );
  }
}
