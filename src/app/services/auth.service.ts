import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios, { AxiosInstance } from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService { 
  private apiUrl = 'https://hiveducationalmobilebackend.onrender.com'; // Backend URL
  private userIdKey = 'userId'; // Key for storing user ID
  private axiosInstance: AxiosInstance;

  constructor(private router: Router, private http: HttpClient) {
    this.axiosInstance = axios.create({
      baseURL: this.apiUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true 
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
    age: string,
    education_level: string,
    sexual_activity: string,
    marital_status: string,
    testing_history: string,
    hiv_status: string
  ): Promise<any> {
    try {
      const response = await this.axiosInstance.post('https://hiveducationalmobilebackend.onrender.com/signup', {
        email,
        password,
        gender,
        age,
        education_level,
        sexual_activity,
        marital_status,
        testing_history,
        hiv_status,
      }, { withCredentials: true } );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Registration error:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  }
  

// async login(email: string, password: string): Promise<any> {
//   try {
//     const response = await axios.post('http://localhost:8000/login', { email, password });

//     console.log("Backend response:", response);
//     console.log("Response data:", response.data);
//     console.log("Token received:", response.data?.token); // Log token
    
//     // Save the token in localStorage
//     if (response.data?.token) {
//       this.saveToken(response.data.token);
//     }

//     return response.data;
//   } catch (error) {
//     console.error("Error during login request:", error);
//     throw error;
//   }
// }

  // Logout User
  
  async login(email: string, password: string): Promise<any> {
    try {
      const response = await axios.post('https://hiveducationalmobilebackend.onrender.com/login', { email, password },
        { withCredentials: true }
      );
  
      console.log("Backend response:", response);
      console.log("Response data:", response.data);
      console.log("Token received:", response.data?.token); // Log token
      
      // Save the token in localStorage
      if (response.data?.token) {
        this.saveToken(response.data.token);
      }
  
      // Save the user data in localStorage
      const user = response.data?.user;  // Assuming user data is returned in the response
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));  // Store user object in localStorage
      }
  
      return response.data;
    } catch (error) {
      console.error("Error during login request:", error);
      throw error;
    }
  }
  
  
  
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
  getUserId() {
    const user = localStorage.getItem('user');
    if (user) {
        const parsedUser = JSON.parse(user);
        return parsedUser.id || null;  // Assuming 'id' is the key for user ID
    }
    return null;
}

  // Get authenticated user ID from storage
  getAuthenticatedUserId(): string | null {
    return localStorage.getItem('userId');
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { email });
  }

  async requestPasswordReset(email: string): Promise<void> {
    try {
      const response = await axios.post(`${this.apiUrl}/forgot-password`, { email });
      console.log('Password reset request successful:', response.data);
    } catch (error) {
      console.error('Error requesting password reset:', error);
      throw error;
    }
  }
  
}
