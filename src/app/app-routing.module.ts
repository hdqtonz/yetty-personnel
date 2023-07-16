import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { AuthService } from './core/services/auth.service';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('src/app/modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: ':id/login',
    loadChildren: () =>
      import('src/app/modules/login/login.module').then((m) => m.LoginModule),
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
        canActivate: [AuthGuard],
      },
      {
        path: 'table-detail',
        loadChildren: () =>
          import('src/app/modules/table-detail/table-detail.module').then(
            (m) => m.TableDetailModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'account',
        loadChildren: () =>
          import('src/app/modules/account/account.module').then(
            (m) => m.AccountModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'change-password',
        loadChildren: () =>
          import('src/app/modules/change-password/change-password.module').then(
            (m) => m.ChangePasswordModule
          ),
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService],
})
export class AppRoutingModule {}
