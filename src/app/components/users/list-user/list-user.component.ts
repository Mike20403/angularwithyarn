import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllUsers, State } from '../../../reducers';
import * as userActions from '../ngrx/user.actions';
import { Observable } from 'rxjs';
import { User } from '../../../model/User';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.scss']
})
export class ListuserComponent implements OnInit {
  users$!: Observable<User[]>;
  displayedColumns: string[] = [
    'Email',
    'Name',
    'PhoneNumber',
    'status',
    'Created date',
    'Updated date',

  ];

  constructor(private store: Store<State>) {

  }

  ngOnInit(): void {
    // Dispatch the action to load users (assuming you have a loadUsers action)
    this.store.dispatch(userActions.loadUsers());

    // Select the users using your user selector
    this.users$ = this.store.select(selectAllUsers);
  }

}
