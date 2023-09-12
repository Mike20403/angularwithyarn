import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogTemplate } from './dialogtemplate/dialog-template';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {
  showPassword: boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')]),

  });

  constructor(private matdialog: MatDialog,
              private authService: AuthService) {

  }

  onLogin() {
    console.log('test');
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
