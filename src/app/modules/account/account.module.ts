import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AccountComponent],
  imports: [CommonModule, AccountRoutingModule, SharedModule, MatButtonModule],
})
export class AccountModule {}
