import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitorsComponent } from './visitors/visitors.component';
import { OrdersComponent } from './orders/orders.component';
import { SettingsComponent } from './settings/settings.component';
import { PaymentsComponent } from './payments/payments.component';
import { TableDetailComponent } from './table-detail.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'orders',
  //   pathMatch: 'full',
  // },
  // {
  //   path: 'visitors',
  //   component: VisitorsComponent,
  // },
  // {
  //   path: 'orders',
  //   component: OrdersComponent,
  // },
  // {
  //   path: 'settings',
  //   component: SettingsComponent,
  // },
  // {
  //   path: 'payments',
  //   component: PaymentsComponent,
  // },

  {
    path: '',
    component: TableDetailComponent,
    children: [
      {
        path: '',
        redirectTo: 'orders',
        pathMatch: 'full',
      },
      {
        path: 'visitors',
        component: VisitorsComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'payments',
        component: PaymentsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableDetailRoutingModule {}
