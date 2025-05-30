import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service'; // Import AuthService

@Injectable({
  providedIn: 'root'
})
export class UserInteractionService {
  private apiUrl = 'https://hiveducationalmobilebackend.onrender.com/user-interactions'; // Backend URL
  private startTime: number = 0; // To track time spent
  public clicks: number = 0; // To track links clicked
  private currentPageId: number = 0; // Track current page ID

  constructor(private http: HttpClient) {}

  // Start tracking time when user enters a page (by pageId)
  startTracking(page_id: number) {
    this.startTime = Date.now();
    this.clicks = 0; // Reset click count
    this.currentPageId = page_id;
  }

  // Record link clicks
  // recordClick(userId: number) {
  //   if (!this.currentPageId) {
  //     console.error("Page ID is missing!");
  //     return;
  //   }
  
  //   const interactionData = {
  //     pageId: this.currentPageId,
  //     userId,
  //     timeSpent: Math.floor((Date.now() - this.startTime) / 1000), // Calculate time spent
  //     linksClicked: ++this.clicks // Increment clicks count
  //   };
  
  //   this.http.post('http://localhost:8000/user-interaction', interactionData)
  //     .subscribe(
  //       response => console.log("Interaction recorded:", response),
  //       error => console.error("Error recording interaction:", error)
  //     );
  // }
  
  recordClick(page_id: number, user_id: number, time_spent: number, links_clicked: number) {
    console.log("🔹 recordClick() called");
    console.log("📌 pageId:", page_id);
    console.log("📌 userId:", user_id);
    console.log("📌 timeSpent:", time_spent);
    console.log("📌 linksClicked:", links_clicked);
  
    const interactionData = { page_id, user_id, time_spent, links_clicked };
  
    console.log("🚀 Sending interaction data:", interactionData); // ✅ Log before sending
  
    return this.http.post('http://localhost:8000/user-interaction', interactionData)
      .subscribe(
        response => console.log("✅ Interaction recorded successfully:", response),
        error => console.error("❌ Error recording interaction:", error)
      );
  }
  
  

  // Stop tracking when user leaves the page
  stopTracking(user_id: number) {
    const timeSpent = Math.floor((Date.now() - this.startTime) / 1000); // Convert to seconds
    const data = {
      user_id: user_id,
      page_id: this.currentPageId,
      time_spent: timeSpent,
      links_clicked: this.clicks
    };

    // Send data to backend
    // Send data to backend
    this.http.post(`${this.apiUrl}/save`, data).subscribe(response => {
      console.log('User interaction saved:', response);
    }, err => {
      console.error('Error saving user interaction:', err);
    });
  }
}


