import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { DetailsComponent } from './details/details.component';
import { ListuserComponent } from './listuser/listuser.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UsersComponent, DetailsComponent, ListuserComponent, CreateuserComponent],
  imports: [UsersRoutingModule, SharedModule],
  exports: []
})
export class UsersModule {

}
