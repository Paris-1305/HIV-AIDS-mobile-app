import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private apiUrl = 'http://localhost:3000'; // Replace with your backend URL
  private userIdKey = 'userId'; // Key for storing user ID

  constructor(private http: HttpClient, private router: Router) {}

  // Register User
  register(
    email: string,
    password: string,
    gender: string,
    age: number,
    educationLevel:string,
    sexualActivity:string,
    maritalStatus: string,
    testingHistory: string,
    hivStatus: string

  ): Observable<any> {
    const body = {
      email,
      password,
      gender,
      age,
      educationLevel,
      sexualActivity,
      maritalStatus,
      testingHistory,
      hivStatus,
    };
    
    return this.http.post(`${this.apiUrl}/register`, body);
  }

  // Login User
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  // Logout User
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // Save Token to LocalStorage
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Get the currently logged-in user's ID
  getUserId(): string | null {
    return localStorage.getItem(this.userIdKey);
  }

}
