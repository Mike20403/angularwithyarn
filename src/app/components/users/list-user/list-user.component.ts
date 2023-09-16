import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Store } from '@ngrx/store';
import {selectAllUsers, selectPaginator, selectUserEntities, selectUserloading, State} from '../../../reducers';
import * as userActions from '../ngrx/user.actions';
import { Observable } from 'rxjs';
import { User } from '../../../model/User';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-listuser',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit, AfterContentInit {
  mat_select = this.formBuilder.group({
    statusControl: this.formBuilder.control<string | undefined>(''),
    searchControl: this.formBuilder.control<string | undefined>('')
  });
  // Mat table variables
  users!: User[];
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


  totalRows = 0;
  pageSize = 5;
  currentPage = 0 ;
  pageSizeOptions: number[] = [5, 10, 25, 100];


  constructor(private store: Store<State>,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    // get prev filter from localStorage
    const filterInfo = localStorage.getItem('filterInfo');
    const info:any = JSON.parse(filterInfo!);
    this.mat_select.setValue({searchControl: info.searchQuery,statusControl: info.status});
    //  On filter values changed
    this.mat_select.valueChanges.subscribe((changedValues) => {
      this.onStatusChanged({ status: changedValues.statusControl, search: changedValues.searchControl });
    });
    // set start loading
    // Dispatch the action to load users (assuming you have a loadUsers action)
    this.store.dispatch(userActions.loadUsers({
      pageSize: this.pageSize.toString(),
      pageNumber:this.currentPage.toString(),
      status: this.mat_select.controls.statusControl.value!,
      searchQuery: this.mat_select.controls.searchControl.value!,
    }));
    // Select the users using your user selector
    this.store.select(selectAllUsers).subscribe((users: any) => {
      this.users = users;
      console.log(this.users);
        // assign data to dataSource
      this.dataSource = new MatTableDataSource<User>(this.users);

    });
    // Loading state
    this.store.select(selectUserloading).subscribe(
      (loading:boolean) => {
        this.isLoading = loading
    })
  //   Paginator info




  }
  reloadData(){
    this.isLoading = true;

  }
  ngAfterContentInit() {
    this.dataSource.paginator = this.paginator;
    this.store.select((selectPaginator)).subscribe(
      (info) => {
        this.totalRows = info!.totalCount! ==  null ? 0 : info.totalCount! ;

      })
  }
  onPageChanged(event:PageEvent){
    this.pageSize =  event.pageSize;
    this.currentPage = event.pageIndex;
    this.store.dispatch(userActions.loadUsers({
      pageSize: this.pageSize.toString(),
      pageNumber:this.currentPage.toString(),
      status: '--',
      searchQuery: '',
    }))
  }
  onStatusChanged(changedValues: { status: string | null | undefined; search: string | null | undefined; }) {
    this.store.dispatch(userActions.loadUsers({
      pageSize:this.pageSize.toString(),
      pageNumber:this.currentPage.toString(),
      status: changedValues.status!,
      searchQuery: changedValues.search!
    }));

    const filterInfo:any =  JSON.stringify({ searchQuery:changedValues.search,status:changedValues.status});
    localStorage.setItem('filterInfo',filterInfo);
  }

  getRecord(row: User) {

    this.router.navigate(['/users/', row.id]);
  }
}
