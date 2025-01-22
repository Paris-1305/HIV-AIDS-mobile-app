import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://your-backend-api.com'; // Replace with your actual API URL

  constructor() {}

  // Log user interactions such as clicks and time spent
  async logInteraction(interaction: any): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/interactions`, interaction);
      return response.data;
    } catch (error) {
      console.error('Error logging interaction:', error);
      throw error;
    }
  }
 
  // constructor(private http: HttpClient) {}

  // getDynamicContent(contentType: string): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/dynamic-content/${contentType}`);
  // }

  // updateUserProfile(data: any): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/update-profile`, data);
  // }

  // updateContentVector(contentId: string): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/update-content-vector`, { contentId });
  // }

  // updateUserVector(pageId: string): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/update-user-vector`, { pageId });
  // }
  // logInteraction(data: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/interactions`, data);
  // }

  // saveUserInteractions(pageId: string, data: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/save`, { pageId, ...data });
  // }

  // logLinkClick(contentId: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/log-click`, { contentId });
  // }
}