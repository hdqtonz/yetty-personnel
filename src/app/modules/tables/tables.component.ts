import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from 'src/app/core/class/base-component';
import { AccountService } from 'src/app/core/services/account.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Establishment } from '../../core/interface/Establishment';
import { EstablishmentSettings } from '../../core/interface/EstablishmentSettings';
import { Table } from '../../core/interface/Table';
import { TableService } from '../../core/services/table.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
})
export class TablesComponent extends BaseComponent implements OnInit {

  // Data variable
  public TableList: Table;

  constructor(
    private _matSnackkBar: MatSnackBar,
    private _accountService: AccountService,
    private _tableService: TableService
  ) {
    super(_matSnackkBar);

    let user = this._accountService.accountValue;
    console.log(user);
  }

  ngOnInit(): void {
    this.getEstablishmentsTableList();
  }

  selectedTable: string = 'my';

  /**
   * Get Establishments Settings
   */
  getEstablishmentsSettings() {
    this.isLoading = true;
    this._tableService.getEstablishmentSettings()
      .subscribe({
        next: (res: EstablishmentSettings) => {
          this.isLoading = false;
          console.log(res);
        },
        error: (err) => {
          this.isLoading = false;
          this.showError(err?.message);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  /**
   * Get Establishments Info
   */
  getEstablishmentsInfo() {
    this.isLoading = true;
    this._tableService.getEstablishmentInfo()
      .subscribe({
        next: (res: Establishment) => {
          this.isLoading = false;
          console.log(res);
        },
        error: (err) => {
          this.isLoading = false;
          this.showError(err?.message);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  /**
   * Get Establishments Table List
   */
  getEstablishmentsTableList() {
    this.isLoading = true;
    this._tableService.listTables(true)
      .subscribe({
        next: (res: Table) => {
          this.TableList = res;
          this.isLoading = false;
          console.log(this.TableList);
        },
        error: (err) => {
          this.isLoading = false;
          this.showError(err?.message);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }
}
