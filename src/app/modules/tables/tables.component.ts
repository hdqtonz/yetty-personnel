import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from 'src/app/core/class/base-component';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
})
export class TablesComponent extends BaseComponent implements OnInit {
  constructor(private _matSnackkBar: MatSnackBar, private _authService:AuthService) {
    super(_matSnackkBar);

    let user = this._authService.accountValue
    console.log(user, 'user')
  }

  ngOnInit(): void {}

  selectedTable: string = 'my';
}
