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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _route: ActivatedRoute
  ) {
    this._authService.getSessionValidity().subscribe((res) => {
      if (res) {
        this._router.navigate(['tables']);
      }
    });

    this._route.queryParamMap.subscribe((res: any) => {
      console.log('res', res.params.returnUrl);
      this.returnUrl = res.params.returnUrl;
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
        this.getCurrentUser();
      },
      error: () => {},
      complete: () => {},
    });
  }

  getCurrentUser() {
    this._authService.getCurrentUser().subscribe({
      next: (res) => {
        if (this.returnUrl) {
          this.navigetTo(this.returnUrl);
        } else {
          this._router.navigate(['tables']);
        }
        console.log(res, 'getCurrentUser');
      },
      error: () => {},
      complete: () => {},
    });
  }

  navigetTo(path: string) {
    this._router.navigate([path]);
  }
}
