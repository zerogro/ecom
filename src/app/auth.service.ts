import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model'; // Adjust this import based on your user model

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  userRole$ = this.userRoleSubject.asObservable();
  
  private baseUrl = 'http://localhost:8080/api/auth'; // Adjust to your Spring Boot URL

  constructor(private http: HttpClient) {}

  // Method to register a new user
  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, user);
  }

  // Method to log in a user
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password });
  }

  // Method to handle login state and user role
  setLoginState(isLoggedIn: boolean, role: string | null = null): void {
    this.isLoggedInSubject.next(isLoggedIn);
    this.userRoleSubject.next(role);
  }

  // Method to clear the login state (e.g., on logout)
  logout(): void {
    this.setLoginState(false);
    this.userRoleSubject.next(null); // Clear user role on logout
  }
}
