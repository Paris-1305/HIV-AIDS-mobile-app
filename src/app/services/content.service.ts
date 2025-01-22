import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  loadContent(): any {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://your-api-url.com/api/pageContents';

  constructor(private http: HttpClient) {
    console.log('HttpClient initialized:', http);
  }
  
  getPageById(pageId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${pageId}`);
  }

  updatePageVector(pageId: string, interactionType: string, data: any): Observable<any> {
    const payload = { interactionType, data };
    return this.http.patch(`${this.apiUrl}/${pageId}/updateVector`, payload);
  }

  // Fetch content dynamically for a specific page
  async getPageContent(pageName: string): Promise<any> {
    try {
      // Replace with your backend API URL
      const response = await axios.get(`http://localhost:3000/pages`, {
        params: {
          page: pageName, // Query parameter for the page (prevention, treatment, etc.)
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching page content', error);
      throw error;
    }
  }

  getAllPages(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
