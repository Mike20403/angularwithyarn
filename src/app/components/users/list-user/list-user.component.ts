import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllUsers, selectUserEntities, State } from '../../../reducers';
import * as userActions from '../ngrx/user.actions';
import { Observable } from 'rxjs';
import { User } from '../../../model/User';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-listuser',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  mat_select = this.formBuilder.group({
    statusControl: this.formBuilder.control<string | undefined>(''),
    searchControl: this.formBuilder.control<string | undefined>('')
  });
  users!: User[];
  users$!: Observable<User[]>;
  isLoading = false;
  selected!: string;
  displayedColumns: string[] = [
    'Email',
    'Name',
    'PhoneNumber',
    'status',
    'Created date',
    'Updated date',

  ];

  constructor(private store: Store<State>,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
  ) {

  }

  ngOnInit(): void {
    this.mat_select.valueChanges.subscribe((changedValues) => {
      this.onStatusChanged({ status: changedValues.statusControl, search: changedValues.searchControl });
    });
    // this.mat_select.get('statusControl')?.valueChanges.subscribe((selectedValue) => {
    //   // Handle the selection change here
    //   this.onStatusChanged(selectedValue);
    //
    // });
    this.isLoading = true;
    // Dispatch the action to load users (assuming you have a loadUsers action)
    this.store.dispatch(userActions.loadUsers());

    // Select the users using your user selector
    this.store.select(selectAllUsers).subscribe((users: any) => {

      console.log('[List User]: ', users);
      this.users = users;
      if (this.users.length > 0) {
        this.isLoading = false;
      }

    });

  }

  onStatusChanged(changedValues: { status: string | null | undefined; search: string | null | undefined; }) {
    this.store.dispatch(userActions.changeFilter({
      status: changedValues.status!,
      searchQuery: changedValues.search!
    }));
  }

  getRecord(row: User) {
    console.log(row);
    this.router.navigate(['/users/', row.id]);
  }
}
