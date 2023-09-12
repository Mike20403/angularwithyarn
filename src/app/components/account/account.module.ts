import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { SharedModule } from '../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';


@NgModule({
  declarations: [AccountComponent],
  imports: [SharedModule, AccountRoutingModule],
  exports: []
})
export class AccountModule {

}
