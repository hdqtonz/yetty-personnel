import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tables',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'tables',
        loadChildren: () =>
          import('src/app/modules/tables/tables.module').then(
            (m) => m.TablesModule
          ),
      },

      {
        path: 'table-detail',
        loadChildren: () =>
          import('src/app/modules/table-detail/table-detail.module').then(
            (m) => m.TableDetailModule
          ),
      },
      {
        path: 'account',
        loadChildren: () =>
          import('src/app/modules/account/account.module').then(
            (m) => m.AccountModule
          ),
      },
      {
        path: 'change-password',
        loadChildren: () =>
          import('src/app/modules/change-password/change-password.module').then(
            (m) => m.ChangePasswordModule
          ),
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('src/app/modules/login/login.module').then((m) => m.LoginModule),
  },

  // {
  //   path:'tables',
  //   loadChildren:()=>import('../app/pages/tables/tables.module').then(m=>m.TablesModule)
  // },
  // {
  //   path:'table-detail',
  //   loadChildren:()=>import('../app/pages/table-detail/table-detail.module').then(m=>m.TableDetailModule)
  // },
  // {
  //   path:'account',
  //   loadChildren:()=>import('../app/pages/account/account.module').then(m=>m.AccountModule)
  // },
  // {
  //   path:'change-password',
  //   loadChildren:()=>import('../app/pages/change-password/change-password.module').then(m=>m.ChangePasswordModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
