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
    console.log('test');
    const api = environment.backend.userApi;
    const token = localStorage.getItem('jwtToken'); // Replace with your actual JWT token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<User[]>(api, { headers });
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
    const token = localStorage.getItem('jwtToken'); // Replace with your actual JWT token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    let params = new HttpParams();
    if (action.status != '--') {
      params = params.append('status', action.status);
    }
    if (action.searchQuery != '') {
      params = params.append('searchQuery', action.searchQuery);
    }
    return this.http.get<User[]>(api, { headers, params });


  }
}
