import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../model/User';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) {

  }

  getUsers(): Observable<User[]> {

    const api = environment.backend.userApi;

    return this.http.get<User[]>(api);
  }

  addUser(user: any): Observable<User> {
    return of();
  }

  updateUser(user: any): Observable<User> {
    return of();
  }

  deleteUser(id: string): Observable<User> {
    return of();
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
