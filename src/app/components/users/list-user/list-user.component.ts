import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllUsers, selectUserEntities, State } from '../../../reducers';
import * as userActions from '../ngrx/user.actions';
import { Observable } from 'rxjs';
import { User } from '../../../model/User';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-listuser',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit, AfterViewInit {
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
  dataSource!: MatTableDataSource<User>;
  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(private store: Store<State>,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    //  On filter values changed
    this.mat_select.valueChanges.subscribe((changedValues) => {
      this.onStatusChanged({ status: changedValues.statusControl, search: changedValues.searchControl });
    });
    // set start loading
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
      // assign data to dataSource
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator;

    });

  }

  ngAfterViewInit() {

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
