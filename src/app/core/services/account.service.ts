import { Injectable } from '@angular/core';
import { profileAPIEndpoints } from '../class/endpoints/profile';
import { PasswordChangeRequest } from '../interface/PasswordChangeRequest';
import { Profile } from '../interface/Profile';
import { ProfileUpdateRequest } from '../interface/ProfileUpdateRequest';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private _http: HttpClientService) { }

  getLoggedInUserProfile() {
    return this._http.get<Profile>(`${profileAPIEndpoints._getLoggedInUserProfile}`);
  }

  updateLoggedInUserProfile(reqBody: ProfileUpdateRequest) {
    return this._http.put(`${profileAPIEndpoints._updateLoggedInUserProfile}`, reqBody);
  }

  setLoggedInUserPassword(reqBody: PasswordChangeRequest) {
    return this._http.put(`${profileAPIEndpoints._setLoggedInUserPassword}`, reqBody);
  }
}
