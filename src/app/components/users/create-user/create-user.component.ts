import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../../../reducers';
import { addUser } from '../ngrx/user.actions';
import { User } from '../../../model/User';

@Component({
  selector: 'app-createuser',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  constructor(private store:Store<State>) {
  }

  showPassword: boolean = false;
  createUserForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
    password: new FormControl(''),
    phoneNum: new FormControl(''),
    status: new FormControl(true)

  });

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }


  onCreate() {
    const user = {
      username:this.createUserForm.controls['email'].value,
      firstname:this.createUserForm.controls['firstname']
    }
  }
    this.store.dispatch(addUser({))
  }

}
