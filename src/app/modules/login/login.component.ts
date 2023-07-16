import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { environment } from '../../../environments/environment';
import { AuthService } from 'src/app/core/services/auth.service';
import { BaseComponent } from 'src/app/core/class/base-component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { AccountService } from 'src/app/core/services/account.service';
import { Profile } from 'src/app/core/interface/Profile';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  public loginForm: FormGroup;
  public returnUrl: string;
  public establishmentId: string;

  constructor(
    private _matSnackBar: MatSnackBar,
    private _router: Router,
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private _localStorageService: LocalStorageService,
    private _accountService: AccountService
  ) {
    super(_matSnackBar);
    this._authService.getSessionValidity().subscribe((res) => {
      if (res) {
        this._router.navigate(['tables']);
      }
    });

    // Getting redirect path
    this._route.queryParamMap.subscribe((res: any) => {
      console.log('res', res.params.returnUrl);
      this.returnUrl = res.params.returnUrl;
    });

    // Getting establishment id from path
    this._route.paramMap.subscribe((res: any) => {
      this.establishmentId = res.params.id;
      this._localStorageService.setItem(
        'establishmentId',
        this.establishmentId
      );
    });
  }

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  initializeLoginForm() {
    this.loginForm = this._fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false

    let usrename = form.value.username;
    let password = form.value.password;
    this._authService.authenticate(usrename, password).subscribe({
      next: (res) => {
        console.log(res, 'authenticate');
        if (res) {
          setTimeout(() => {
            this.getCurrentUser();
          }, 500);
        }
      },
      error: (err) => {
        this.showError(err.message);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  getCurrentUser() {
    this._accountService.getLoggedInUserProfile().subscribe({
      next: (res: Profile) => {
        if (this.returnUrl) {
          this.navigetTo(this.returnUrl);
        } else {
          this._router.navigate(['tables']);
        }
        this.showMessage('Logged in successfully');
      },
      error: (err) => {
        this.showError(err.message);
        this._authService.signOut();
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  navigetTo(path: string) {
    this._router.navigate([path]);
  }
}
