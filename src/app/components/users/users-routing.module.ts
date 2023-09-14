import { UsersComponent } from './users.component';
import { ListUserComponent } from './list-user/list-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [{

  path: '', component: UsersComponent,
  children:
    [
      {
        path: '', component: ListUserComponent
      },
      {
        path: 'create', component: CreateUserComponent
      },
      {
        path: ':id', component: UserDetailsComponent
      },
      {
        path: '**', redirectTo: '', pathMatch: 'full'
      },
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UsersRoutingModule {

}
