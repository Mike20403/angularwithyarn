import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../model/User';
import { Store } from '@ngrx/store';
import { selectisEdited, selectUserById, State } from '../../../reducers';
import { deleteUser, loadUsers, updateUser } from '../ngrx/user.actions';

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
              private store: Store<State>) {

    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(loadUsers());
    this.store.select(selectUserById(this.userId)).subscribe(
      (user) => {
        if (user) {
          this.user = user;
        }
      });
  }

  onUpdate($event: { firstname: string; lastname: string; phoneNumber: string; status: string }) {
    this.store.dispatch(updateUser({ ...$event, id: this.userId }));
    this.store.dispatch(loadUsers());
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
