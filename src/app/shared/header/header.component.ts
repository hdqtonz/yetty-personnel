import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/core/interface/Profile';
import { AccountService } from 'src/app/core/services/account.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn: boolean = true;
  user: Profile;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _accountService: AccountService
  ) {
    this.user = this._accountService.accountValue;
  }

  ngOnInit(): void {}

  logOut() {
    this._authService.signOut();
  }

  navigateTo(path: string) {
    this._router.navigate([path]);
  }
}
