import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { ForgotpwComponent } from '../account/forgotpw/forgotpw.component';


@NgModule({
  declarations: [AuthComponent, LoginDialogComponent, ForgotpwComponent],
  imports: [SharedModule, AuthRoutingModule],

})
export class AuthModule {

}
