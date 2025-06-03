import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,IonHeader, IonTitle,IonList, IonItem, IonLabel, 
 IonIcon,IonChip, IonButton, IonSpinner, IonToolbar } from '@ionic/angular/standalone';
import { UserInteractionService } from 'src/app/services/user-interaction.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { ContentService } from 'src/app/services/content.service';
import { UserService } from 'src/app/services/user.service';
import { ViewWillLeave } from '@ionic/angular';


@Component({
  selector: 'app-staying-healthy',
  templateUrl: './staying-healthy.page.html',
  styleUrls: ['./staying-healthy.page.scss'],
  standalone: true,
  providers:[HttpClient, ContentService, UserService, HttpService, AuthService, UserInteractionService],
  imports: [IonContent, IonHeader, IonTitle, IonSpinner, HttpClientModule, IonList, IonItem,
  IonIcon,IonChip,  IonLabel, IonToolbar, CommonModule, FormsModule]
})
export class StayingHealthyPage implements OnInit,OnDestroy,ViewWillLeave {
 page_id: number | null = null;  // Unique ID for Testing Page
  content: any = null;  // To store the fetched content
  user_id: number | null = null;  // User ID from AuthService
  private startTime: number = 0;
  private pageLoadTime!: number;
  private time_spent: number = 0;
  private timer: any;


  constructor(
    private userInteractionService: UserInteractionService,
    private http: HttpClient,
    private authService: AuthService,  // Inject AuthService
    private httpService: HttpService,  // Inject HttpService to load content
    private route: ActivatedRoute  // Inject ActivatedRoute to get pageId from URL params
  ) {}


  ngOnInit() {
    this.time_spent = 0;
    this.pageLoadTime = Date.now(); // Capture the exact time when the page loads
    console.log('🔹 Page loaded at:', new Date(this.pageLoadTime).toLocaleTimeString());
  
    // 🛑 Clear any existing timer before setting a new one
    if (this.timer) {
      clearInterval(this.timer);
    }
  
    // ✅ Start a timer that runs once per second
    this.timer = setInterval(() => {
      this.time_spent = Math.floor((Date.now() - this.pageLoadTime) / 1000); // time in seconds
      console.log('⏳ Time Spent:', this.time_spent);
    }, 1000);
  
    // Get the user ID from AuthService
    this.user_id = this.authService.getUserId();  
    if (this.user_id) {
      console.log('✅ User ID:', this.user_id);
    } else {
      console.error('❌ User ID is missing');
    }
  
    // Get page ID from the route and load content
    this.route.queryParams.subscribe(params => {
      this.page_id = params['id'] ? +params['id'] : null;  // Capture the 'id' query parameter
      if (this.page_id) {
        this.loadContent();  // Load content if pageId is valid
        this.userInteractionService.startTracking(this.page_id);  // Start tracking time and clicks
      } else {
        console.error('❌ No page ID found.');
      }
    });
  }
  
  
  
  // Method to load content based on the pageId
  async loadContent() {
    if (!this.page_id) {
      console.error('Page ID is not set.');
      return;
    }

    try {
      console.log('Fetching content for page ID:', this.page_id);
      const response = await this.httpService.getPageContent(this.page_id);  // Fetch content based on pageId
      this.content = response;  // Set the fetched content
      console.log('Content loaded:', this.content);
    } catch (err) {
      console.error('Error fetching page content:', err);
    }
  }
  
  onLinkClick() {

    if (this.page_id && this.user_id) {
      console.log("✅ Calling recordClick() with:", this.page_id, this.user_id, this.time_spent, this.userInteractionService.clicks + 1);
      
      const result = this.userInteractionService.recordClick(
        this.page_id, 
        this.user_id, 
        this.time_spent, 
        ++this.userInteractionService.clicks
      );
  
      console.log("📌 recordClick() returned:", result);
    } else {
      console.error("❌ Page ID or User ID is missing!");
    }
  } 

  ionViewWillLeave() {
    clearInterval(this.timer);
    console.log(`🚀 ionViewWillLeave: Time spent on page ${this.time_spent} seconds`);

    if (this.page_id && this.user_id) {
      this.userInteractionService.stopTracking(this.user_id);
    } else {
      console.error('❌ Page ID or User ID is missing!');
    }
  }

  // Stop tracking when the user leaves the page (ngOnDestroy)
  ngOnDestroy() {
    // clearInterval(this.timer);
    // console.log(`Time spent on the page: ${this.time_spent} seconds`);
    // if (this.page_id && this.user_id) {
    //   this.userInteractionService.stopTracking(this.user_id);  // Stop tracking time and clicks
    // } else {
    //   console.error('Page ID or User ID is missing!');
    // }
    console.log('ngOnDestroy triggered');
  }

  getLinkDisplayName(url: string): string {
    // Extract domain or clean URL for display
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      return domain || url;
    } catch {
      return url;
    }
  }
}
