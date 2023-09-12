import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { ListuserComponent } from './components/users/listuser/listuser.component';
import { CreateuserComponent } from './components/users/createuser/createuser.component';
import { DetailsComponent } from './components/users/details/details.component';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { AccountComponent } from './components/account/account.component';
import { ForgotpwComponent } from './components/account/forgotpw/forgotpw.component';
import { LoginDialogComponent } from './components/auth/login-dialog/login-dialog.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./components/admin-dashboard/admin-dashboard.module').then(x => x.AdminDashboardModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./components/account/account.module').then(x => x.AccountModule)
      },

      {
        path: 'users',
        loadChildren: () => import('./components/users/users.module').then(x => x.UsersModule)
      }
    ]
  }, {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.module').then(x => x.AuthModule)
  },


];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
