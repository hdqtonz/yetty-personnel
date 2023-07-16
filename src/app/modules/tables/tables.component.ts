import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from 'src/app/core/class/base-component';
import { AccountService } from 'src/app/core/services/account.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
})
export class TablesComponent extends BaseComponent implements OnInit {
  constructor(
    private _matSnackkBar: MatSnackBar,
    private _accountService: AccountService
  ) {
    super(_matSnackkBar);

    let user = this._accountService.accountValue;
    console.log(user);
  }

  ngOnInit(): void {}

  selectedTable: string = 'my';
}
