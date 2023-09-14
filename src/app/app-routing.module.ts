import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './components/auth/auth.guard';
import { LoginGuard } from './components/login.guard';


const routes: Routes = [
  {
    path: '', component: HomeComponent,
    canActivate: [AuthGuard],
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
    canActivate: [LoginGuard],
    loadChildren: () => import('./components/auth/auth.module').then(x => x.AuthModule)
  },
  {
    path: '**',
    redirectTo: ''
  }


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
