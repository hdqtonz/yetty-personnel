import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TablesComponent],
  imports: [
    CommonModule,
    TablesRoutingModule,
    SharedModule,
    MatRadioModule,
    FormsModule,
    MatCheckboxModule,
  ],
})
export class TablesModule {}
