import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { ListuserComponent } from './components/users/listuser/listuser.component';
import { CreateuserComponent } from './components/users/createuser/createuser.component';
import { DetailsComponent } from './components/users/details/details.component';
import { HomeComponent } from './components/home/home.component';
import { AccountComponent } from './components/account/account.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'admin-dashboard', component: DashboardComponent
  },
  {
    path: 'account', component: AccountComponent,
    children: []
  },
  {
    path: 'users', component: UsersComponent,
    children:
      [
        {
          path: '', redirectTo: 'list', pathMatch: 'full'
        }
        ,
        {
          path: 'list', component: ListuserComponent
        },
        {
          path: 'create', component: CreateuserComponent
        },
        {
          path: 'details', component: DetailsComponent
        }
      ]
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
