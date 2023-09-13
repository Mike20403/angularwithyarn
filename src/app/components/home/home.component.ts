import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLoggedInUser, State } from '../../reducers';
import * as authActions from '../auth/ngrx/auth-actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private store: Store<State>) {
  }

  ngOnInit() {
    this.store.dispatch(authActions.autoLogin());
  }
}
