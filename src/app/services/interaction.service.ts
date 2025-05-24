import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  private apiUrl = 'http://localhost:8000/interactions';

  constructor(private http: HttpClient) {}

  updateInteraction(userId: string, pageId: number, timeSpent: number, linksClicked: number) {
    return this.http.post(`${this.apiUrl}/update`, { userId, pageId, timeSpent, linksClicked });
  }
}
