import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogTemplate } from './dialogtemplate/dialog-template';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Store } from '@ngrx/store';
import * as authAction from '../ngrx/auth-actions';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {
  showPassword: boolean = false;
  isSubmitted: boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')]),

  });

  constructor(private matdialog: MatDialog,
              private authService: AuthService,
              private store: Store) {

  }

  onLogin() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm.value);

    this.store.dispatch(authAction.login({
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    }));
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  openDialog() {
    this.matdialog.open(DialogTemplate);
  }

  protected readonly name = name;
  protected readonly console = console;
}
