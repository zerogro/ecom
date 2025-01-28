import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/auth'; // Adjust as necessary

  constructor(private http: HttpClient) {}

  getUserProfile(email: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/profile?email=${email}`);
  }
}
