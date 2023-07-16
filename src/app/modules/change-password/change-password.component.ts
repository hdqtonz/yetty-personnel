import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from 'src/app/core/class/base-component';
import { PasswordChangeRequest } from 'src/app/core/interface/PasswordChangeRequest';
import { AccountService } from 'src/app/core/services/account.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent extends BaseComponent implements OnInit {
  changePassFrom: FormGroup;

  constructor(
    private _matSnackBar: MatSnackBar,
    private _fb: FormBuilder,
    private _accountService: AccountService,
    private _authService: AuthService
  ) {
    super(_matSnackBar);
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.changePassFrom = this._fb.group({
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  initializePaylod(data) {
    const reqBody = new PasswordChangeRequest();
    reqBody.password = data.newPassword;

    return reqBody;
  }

  onSubmit(form: FormGroup) {
    let currentPassword = form.value.currentPassword;
    let newPassword = form.value.newPassword;
    let confirmPassword = form.value.confirmPassword;
    if (newPassword !== confirmPassword) {
      this.showError(" Password Doesn't match");
      this.changePassFrom.reset();
      return;
    }

    this._accountService
      .setLoggedInUserPassword(this.initializePaylod(form.value))
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          this.showMessage('Your password has changed');
          console.log(res, 'res');
        },
        error: (err) => {
          this.isLoading = false;
          this.showError(err.message);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }
}
