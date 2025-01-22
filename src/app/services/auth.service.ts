// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
 
//   private apiUrl = 'http://localhost:3000'; // Replace with your backend URL
//   private userIdKey = 'userId'; // Key for storing user ID

//   constructor(private http: HttpClient, private router: Router) {}

//   // Register User
//   register(
//     email: string,
//     password: string,
//     gender: string,
//     age: number,
//     educationLevel:string,
//     sexualActivity:string,
//     maritalStatus: string,
//     testingHistory: string,
//     hivStatus: string

//   ): Observable<any> {
//     const body = {
//       email,
//       password,
//       gender,
//       age,
//       educationLevel,
//       sexualActivity,
//       maritalStatus,
//       testingHistory,
//       hivStatus,
//     };
    
//     return this.http.post(`${this.apiUrl}/register`, body);
//   }

//   // Login User
//   login(email: string, password: string): Observable<any> {
//     const body = { email, password };
//     return this.http.post(`${this.apiUrl}/login`, body);
//   }

//   // Logout User
//   logout(): void {
//     localStorage.removeItem('token');
//     this.router.navigate(['/login']);
//   }

//   // Save Token to LocalStorage
//   saveToken(token: string): void {
//     localStorage.setItem('token', token);
//   }

//   // Get the currently logged-in user's ID
//   getUserId(): string | null {
//     return localStorage.getItem(this.userIdKey);
//   }

//   //Get user profile
//   getUserProfile(userId: string): Observable<any> {
//     return this.http.get(`${this.apiUrl}/${userId}`);
//   }
//   getAuthenticatedUserId(): string | null {
//     // Logic to fetch the user ID from local storage, session, or token
//     return localStorage.getItem('userId');
//   }
// }

import axios, { AxiosInstance } from 'axios';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Backend URL
  private userIdKey = 'userId'; // Key for storing user ID
  private axiosInstance: AxiosInstance;

  constructor(private router: Router) {
    this.axiosInstance = axios.create({
      baseURL: this.apiUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add interceptor to include authorization token if available
    this.axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });
  }

  // Register User
  async register(
    email: string,
    password: string,
    gender: string,
    age: number,
    educationLevel: string,
    sexualActivity: string,
    maritalStatus: string,
    testingHistory: string,
    hivStatus: string
  ): Promise<any> {
    try {
      const response = await this.axiosInstance.post('/signup', {
        email,
        password,
        gender,
        age,
        educationLevel,
        sexualActivity,
        maritalStatus,
        testingHistory,
        hivStatus,
      });
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Login User
  async login(email: string, password: string): Promise<any> {
    try {
      const response = await this.axiosInstance.post('/login', {
        email,
        password,
      });

      if (response.data.token) {
        this.saveToken(response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
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

  // Get User Profile
  async getUserProfile(): Promise<any> {
    try {
      const response = await this.axiosInstance.get('/profile');
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  }

  // Get authenticated user ID from storage
  getAuthenticatedUserId(): string | null {
    return localStorage.getItem('userId');
  }
}
