import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../model/User';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  api = environment.backend.userApi;

  constructor(private http: HttpClient) {

  }

  getUsers(payload:{status:string,searchQuery:string,pageNumber:string,pageSize:string}): Observable<HttpResponse<User[]>> {

    let api = environment.backend.userApi;

    let params = new HttpParams();
    if (payload.status != '--') {
      params = params.append('Status', payload.status);
    }
    if (payload.searchQuery != '') {
      params = params.append('SearchQuery', payload.searchQuery);
    }
    params = params.append('PageNumber',payload.pageNumber);
    params = params.append('PageSize',payload.pageSize);

    return this.http.get<User[]>(this.api,{params,observe: 'response'});
  }

  addUser(user: any): Observable<User> {

    return this.http.post<User>(this.api, user);
  }

  updateUser(user: any): Observable<User> {
    return this.http.put<User>(this.api + '/' + user.id, user);
  }
  getUserByID(payload:{id:string}):Observable<User>{
    return this.http.get<User>(this.api+'/'+payload.id);
  }
  deleteUser(id: string): Observable<any> {
    return this.http.delete(this.api + '/' + id);
  }

  getFilterUsers(payload: { searchQuery: string, status: string }): Observable<User[]> {

    console.log('[getFilterUsers]: ');
    let api = environment.backend.userApi;

    let params = new HttpParams();
    if (payload.status != '--') {
      params = params.append('Status', payload.status);
    }
    if (payload.searchQuery != '') {
      params = params.append('SearchQuery', payload.searchQuery);
    }
    return this.http.get<User[]>(api, { params });


  }
}
