import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {

  }


  login(username: string, password: string): Observable<any> {
    // Construct the login request body or parameters as needed by your API
    const requestBody = {
      username,
      password,
    };

    // Make an HTTP POST request to your login endpoint
    return this.http.post<any>(`${environment.backend.apiUrl}/login`, requestBody);
  }
}
