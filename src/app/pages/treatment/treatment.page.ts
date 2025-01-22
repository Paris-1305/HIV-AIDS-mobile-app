import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader,  IonTitle, IonToolbar, IonSpinner } from '@ionic/angular/standalone';
import { ContentService } from 'src/app/services/content.service';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.page.html',
  styleUrls: ['./treatment.page.scss'],
  standalone: true,
  providers:[HttpClient,ContentService,UserService,HttpService],
  imports: [IonSpinner, IonContent, IonHeader, IonTitle, HttpClientModule,
    IonToolbar, CommonModule, FormsModule]
})
export class TreatmentPage implements OnInit {
  content: any = null; // Dynamic content
  private startTime!: number;
  private pageId: number | null = null;  // Declare pageId dynamically
 // Unique identifier for the page

  constructor(
    private contentService: ContentService,
    private userService: UserService,
    private httpService: HttpService,
    private route: ActivatedRoute

  ) {
  
  }

  ngOnInit() {
    this.startTime = Date.now();
    this.loadContent();
     // Get page ID from the route
  this.route.queryParams.subscribe(params => {
    this.pageId = params['id']; // Capture the 'id' query parameter
    if (this.pageId) {
      this.loadContent();
    } else {
      console.error('No page ID found.');
    }
  });
  }

  // Load dynamic content from the database
  
  // async loadContent() {
  //   try {
  //     const pageData = await this.httpService.getCurrentPageId();  // Fetch page ID dynamically from backend
  //     if (pageData && pageData.id) {
  //       const response = await this.httpService.getPageContent(pageData.id);
  //       this.content = response;
  //       console.log('Content loaded:', this.content);
  //     } else {
  //       console.error('No page ID returned from server.');
  //     }
  //   } catch (err) {
  //     console.error('Error fetching page ID:', err);
  //   }
  // }

  async loadContent() {
    try {
      if (!this.pageId) {
        console.error('Page ID is not set.');
        return;
      }
  
      console.log('Fetching content for page ID:', this.pageId);
  
      const response = await this.httpService.getPageContent(this.pageId);  // Fetch content based on pageId
      this.content = response;  // Set the fetched content
      console.log('Content loaded:', this.content);
    } catch (err) {
      console.error('Error fetching page content:', err);
    }
  }

  // Track clicks and interactions
  trackClick(event: Event, contentId: string) {
    this.userService.logInteraction({
      type: 'click',
      pageId: this.pageId,  // Consider making this dynamic if needed
      contentId: contentId,
      timestamp: new Date().toISOString(),
    })
    .then(() => {
      console.log('Interaction logged');
    })
    .catch((err: any) => {
      console.error('Failed to log interaction', err);
    });
  }
  

  // Log time spent when leaving the page
  ngOnDestroy() {
    if (!this.pageId) {
      console.error('Page ID not set, skipping interaction logging.');
      return;
    }
    
    const timeSpent = (Date.now() - this.startTime) / 1000; // Time in seconds
    this.userService.logInteraction({
      type: 'time_spent',
      pageId: this.pageId,  // Use dynamically fetched page ID
      duration: timeSpent,
      timestamp: new Date().toISOString(),
    })
    .then(() => {
      console.log('Time spent logged');
    })
    .catch((err: any) => {
      console.error('Failed to log time spent', err);
    });
  }
}
