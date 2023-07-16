import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from 'src/app/core/class/base-component';
import { ProfileUpdateRequest } from 'src/app/core/interface/ProfileUpdateRequest';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent extends BaseComponent implements OnInit {
  accountForm: FormGroup;
  changeProfile: ProfileUpdateRequest;

  constructor(
    private _matSnackbar: MatSnackBar,
    private _fb: FormBuilder,
    private _accountService: AccountService
  ) {
    super(_matSnackbar);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getUserProfile();
  }

  initializeForm() {
    this.accountForm = this._fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  getUserProfile() {
    this._accountService.getLoggedInUserProfile().subscribe({
      next: (res) => {
        this.changeProfile = res;
        this.isLoading = false;
        this.setAccountFormValue(this.changeProfile);
      },
      error: (err) => {
        this.showError(err.message);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  setAccountFormValue(value) {
    this.accountForm.get('firstName').setValue(value.firstName);
    this.accountForm.get('lastName').setValue(value.lastName);
    this.accountForm.get('email').setValue(value.email);
  }

  initializeFormPayload(data: ProfileUpdateRequest) {
    const reqBody = new ProfileUpdateRequest();
    reqBody.email = data.email;
    reqBody.firstName = data.firstName;
    reqBody.lastName = data.lastName;

    return reqBody;
  }

  onSubmit(form: FormGroup) {
    if (!form.valid) {
      return;
    }

    this._accountService
      .updateLoggedInUserProfile(this.initializeFormPayload(form.value))
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          this.showMessage('Profile updated successfully');
        },
        error: (err) => {
          this.showError(err.message);
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }
}
