import { AuthComponent } from './auth.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { ForgotpwComponent } from '../account/forgotpw/forgotpw.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [{
  path: '', component: AuthComponent,
  children: [
    {
      path: 'login', component: LoginDialogComponent
    },
    {
      path: 'forgotpw', component: ForgotpwComponent
    },
    {
      path: '**', redirectTo: 'login', pathMatch: 'full'
    },
  ]
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {

}

