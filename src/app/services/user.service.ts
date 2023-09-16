import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../model/User';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  api = environment.backend.userApi;

  constructor(private http: HttpClient) {

  }

  getUsers(): Observable<User[]> {


    return this.http.get<User[]>(this.api);
  }

  addUser(user: any): Observable<User> {

    return this.http.post<User>(this.api, user);
  }

  updateUser(user: any): Observable<User> {
    return this.http.put<User>(this.api + '/' + user.id, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(this.api + '/' + id);
  }

  getFilterUsers(action: { searchQuery: string, status: string }): Observable<User[]> {

    console.log('[getFilterUsers]: ');
    let api = environment.backend.userApi;

    let params = new HttpParams();
    if (action.status != '--') {
      params = params.append('status', action.status);
    }
    if (action.searchQuery != '') {
      params = params.append('searchQuery', action.searchQuery);
    }
    return this.http.get<User[]>(api, { params });


  }
}
