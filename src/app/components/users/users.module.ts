import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { ListUserComponent } from './list-user/list-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import {  MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormTemplateComponent } from './form-template/form-template.component';

@NgModule({
  declarations: [UsersComponent, UserDetailsComponent, ListUserComponent, CreateUserComponent, FormTemplateComponent],
  imports: [UsersRoutingModule, SharedModule, MatTableModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule
    , MatCheckboxModule, MatSnackBarModule],
  exports: [],
  providers: []
})
export class UsersModule {

}
