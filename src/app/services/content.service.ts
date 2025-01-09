import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  getPageContent(pageId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${pageId}`);
  }
}
