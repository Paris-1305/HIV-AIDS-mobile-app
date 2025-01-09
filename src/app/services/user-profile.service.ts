import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private apiUrl = 'https://your-api-url.com/api/userProfiles';

  constructor(private http: HttpClient) {}

  getUserProfile(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  updateUserProfileVector(
    userProfile: any,
    pageContent: any,
    interactionType: string,
    data: any
  ): Observable<any> {
    const payload = { interactionType, data, pageId: pageContent.id };
    return this.http.patch(`${this.apiUrl}/${userProfile.id}/updateVector`, payload);
  }
}
