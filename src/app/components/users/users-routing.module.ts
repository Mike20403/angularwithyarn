import { UsersComponent } from './users.component';
import { ListuserComponent } from './listuser/listuser.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { DetailsComponent } from './details/details.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [{

  path: '', component: UsersComponent,
  children:
    [
      {
        path: '', component: ListuserComponent
      },
      {
        path: 'create', component: CreateuserComponent
      },
      {
        path: ':id', component: DetailsComponent
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
