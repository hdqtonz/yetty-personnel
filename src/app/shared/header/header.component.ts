import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn: boolean = true;

  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {}

  logOut() {
    this._authService.signOut();
  }

  navigateTo(path: string) {
    this._router.navigate([path]);
  }
}
