import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  changePassFrom: FormGroup;

  constructor(private _fb: FormBuilder, private _authService: AuthService) {}

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

  onSubmit(form: FormGroup) {
    let currentPassword = form.value.currentPassword;
    let newPassword = form.value.currentPassword;
    let confirmPassword = form.value.confirmPassword;
    console.log(confirmPassword, 'confirmPassword');
    if (newPassword !== confirmPassword) {
      return;
    }

    this._authService.changePassword(currentPassword, newPassword).subscribe({
      next: (res) => {
        console.log(res, 'changePassword');
      },
      error: (err) => {},
      complete: () => {},
    });
  }
}
