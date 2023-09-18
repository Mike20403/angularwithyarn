import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectAuthToken, selectCurrentUser, State} from "../../reducers";
import jwt_decode from "jwt-decode";
import {loadUserByID} from "../users/ngrx/user.actions";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements  OnInit{
  id!:string;
  name!:string;
  phoneNum!:string;
  username!:string;
  constructor(private store:Store<State>) {
  }
  ngOnInit(): void {
    this.store.select(selectAuthToken).subscribe(
      (token)=> {

        const decodedToken: any = jwt_decode(token!);
        const id = decodedToken.sub;
        if (id){
          this.store.dispatch(loadUserByID({id:id}));
          this.store.select(selectCurrentUser).subscribe(
            (user) => {
              this.username = user.username;
              this.name = user.firstname +' '+user.lastname;
              this.phoneNum = user.phoneNumber;
            }
          )
        }

      }
    )
  }
// add test3
}
