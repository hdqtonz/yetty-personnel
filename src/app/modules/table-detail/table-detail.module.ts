import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableDetailComponent } from './table-detail.component';
import { OrdersComponent } from './orders/orders.component';
import { PaymentsComponent } from './payments/payments.component';
import { SettingsComponent } from './settings/settings.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { TableDetailRoutingModule } from './table-detail-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TableDetailComponent,
    OrdersComponent,
    PaymentsComponent,
    SettingsComponent,
    VisitorsComponent,
  ],
  imports: [
    CommonModule,
    TableDetailRoutingModule,
    SharedModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
  ],
})
export class TableDetailModule {}
