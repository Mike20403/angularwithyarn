import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectUserError, State } from '../../../reducers';
import { addUser } from '../ngrx/user.actions';

import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-createuser',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  constructor(private store: Store<State>) {
  }

  protected readonly console = console;

  ngOnInit(): void {
  }

  onCreate(data: {
    username: string, password: string, firstname: string, lastname: string, phoneNumber: string,
    status: string
  }) {

    this.store.dispatch(addUser({ ...data }));
  }
}
