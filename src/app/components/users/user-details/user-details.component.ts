import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { User } from '../../../model/User';
import { Store } from '@ngrx/store';
import {selectCurrentUser, selectisEdited, State} from '../../../reducers';
import {deleteUser, loadUserByID,  updateUser} from '../ngrx/user.actions';

@Component({
  selector: 'app-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  userId!: string;
  user = {} as User;
  isEdited: boolean = false;

  constructor(private route: ActivatedRoute,
              private router:Router,
              private store: Store<State>) {

    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(loadUserByID({id:this.userId}));
    this.store.select(selectCurrentUser).subscribe(
      (user) => {
        if (user) {
          this.user = user;
        }
      });

  }

  onUpdate($event: { firstname: string; lastname: string; phoneNumber: string; status: string }) {
    this.store.dispatch(updateUser({ ...$event, id: this.userId }));
    this.store.dispatch(loadUserByID({id:this.userId}));
    this.store.select(selectisEdited).subscribe(
      (isEdited) => {
        this.isEdited = isEdited;
      }
    );

  }

  onCancel() {
    this.isEdited = false;
  }

  onDelete() {
    this.store.dispatch(deleteUser({ id: this.userId }));
  }
}
