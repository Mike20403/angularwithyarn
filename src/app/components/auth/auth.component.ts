import { Component } from '@angular/core';
import { User } from '../../model/User';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  constructor() {

  }

  user: User = {
    email: '',
    password: ''
  };

  onSubmit(login_form: any) {
    console.log(login_form.value);
  }
}
