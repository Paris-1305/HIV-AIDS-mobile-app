import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,IonHeader, IonTitle,IonSpinner,IonItem,IonChip,IonIcon,
  IonList, IonLabel,IonButton, IonToolbar } from '@ionic/angular/standalone';import { catchError, of, Subscription, tap, throwError, timer } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router'
import { ContentService } from 'src/app/services/content.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import { ViewWillLeave } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserInteractionService } from 'src/app/services/user-interaction.service';

@Component({
  selector: 'app-prevention',
  templateUrl: './prevention.page.html',
  styleUrls: ['./prevention.page.scss'],
  standalone: true,
  providers:[HttpClient,ContentService,UserService, HttpService,AuthService,UserInteractionService],
  imports: [IonContent, IonHeader, IonTitle, IonSpinner,HttpClientModule,
 IonList, IonItem,IonButton,IonLabel,IonChip,IonIcon,  IonToolbar,  CommonModule, FormsModule]
})

 //export class PreventionPage implements OnInit, OnDestroy {
//   content: any = null; // Dynamic content
//   private startTime!: number;
//   private pageId: number | null = null;  // Declare pageId dynamically
//  // Unique identifier for the page

//   constructor(
//     private contentService: ContentService,
//     private userInteractionService: UserInteractionService,
//     private userService: UserService,
//     private httpService: HttpService,
//     private route: ActivatedRoute,
//     private authService: AuthService,
//     private router: Router

//   ) {
  
//   }
 
//   ngOnInit() {
//     this.startTime = Date.now();
//     console.log('Page started at:', this.startTime);
   
//     // Retrieve query parameter correctly
//     this.route.queryParams.subscribe(params => {
//       this.pageId = params['id'] ? Number(params['id']) : null;
//       console.log('Page ID in ngOnInit:', this.pageId); 
//       if (this.pageId) {
//         console.log('Navigated to PreventionPage with ID:', this.pageId);
//         this.loadContent();
//       } else {
//         console.error('No page ID found. Redirecting...');
//         this.router.navigate(['/']); // Redirect to home or another page if needed
//       }
//     });
  
//   }

//   async loadContent() {
//     try {
//       if (!this.pageId) {
//         console.error('Page ID is not set.');
//         return;
//       }
  
//       console.log('Fetching content for page ID:', this.pageId);
  
//       const response = await this.httpService.getPageContent(this.pageId);  // Fetch content based on pageId
//       this.content = response;  // Set the fetched content
//       console.log('Content loaded:', this.content);
//     } catch (err) {
//       console.error('Error fetching page content:', err);
//     }
//   }
// onLinkClick() {
//   this.userInteractionService.recordClick();
// }
  
//   trackClick(event: Event, pageId: string) {
//     const userId = this.authService.getUserId(); // Get the current user ID
  
//     if (userId) {
//       this.userService.logInteraction({
//         type: 'click',
//         userId: userId,// Send the user ID
//         pageId: this.pageId,  // Ensure this page ID is valid
//         timestamp: new Date().toISOString(),
//       })
//       .then(() => {
//         console.log('Interaction logged');
//       })
//       .catch((err: any) => {
//         console.error('Failed to log interaction', err);
//       });
//     } else {
//       console.error('No user ID found.');
//     }
//   }
  
  
//   // Log time spent when leaving the page
//   // ngOnDestroy() {
//   //   console.log('ngOnDestroy triggered'); 
//   //   if (!this.pageId) {
//   //     console.error('Page ID not set, skipping interaction logging.');
//   //     return;
//   //   }
//   //   const timeSpent = (Date.now() - this.startTime) / 1000; // Time in seconds
//   //    // Log the time spent in the console
//   // console.log(`Time spent on page ${this.pageId}: ${timeSpent} seconds`);
//   //   this.userService.logInteraction({
//   //     type: 'time_spent',
//   //     pageId: this.pageId,  // Use dynamically fetched page ID
//   //     duration: timeSpent,
//   //     timestamp: new Date().toISOString(),
//   //   })
//   //   .then(() => {
//   //     console.log('Time spent logged');
//   //   })
//   //   .catch((err: any) => {
//   //     console.error('Failed to log time spent', err);
//   //   });
//   // }
  
//   // ngOnDestroy() {
//   //   if (this.pageId) {
//   //     const timeSpent = (Date.now() - this.startTime) / 1000;  // Time in seconds
//   //     console.log('Time spent on page:', timeSpent); // Check in console
//   //     this.userService.logInteraction({
//   //       type: 'time_spent',
//   //       userId: this.authService.getUserId(),  // Make sure the user ID is passed
//   //       pageId: this.pageId,
//   //       timeSpent: timeSpent,
//   //       timestamp: new Date().toISOString(),
//   //     })
//   //     .then(() => {
//   //       console.log('Time spent logged successfully');
//   //     })
//   //     .catch((err: any) => {
//   //       console.error('Failed to log time spent', err);
//   //     });
//   //   } else {
//   //     console.error('Page ID not set, skipping interaction logging.');
//   //   }
//   // }
 
   
//   ngOnDestroy() {
//     if (this.pageId) {
//       const timeSpent = (Date.now() - this.startTime) / 1000;  // Time in seconds
//       console.log('Time spent on page:', timeSpent); // Check in console
  
//       const userId = this.authService.getUserId(); // Check if this is returning a valid user ID
//       console.log('User ID:', userId);
  
//       if (userId) {
//         this.userService.logInteraction({
//           type: 'time_spent',
//           userId: userId,
//           pageId: this.pageId,
//           timeSpent: timeSpent,
//           timestamp: new Date().toISOString(),
//         })
//         .then(() => {
//           console.log('Time spent logged successfully');
//         })
//         .catch((err: any) => {
//           console.error('Failed to log time spent', err);
//         });
//       } else {
//         console.error('No user ID found.');
//       }
//     } else {
//       console.error('Page ID not set, skipping interaction logging.');
//     }
//   }
  

// }

export class PreventionPage implements OnInit, OnDestroy,ViewWillLeave {
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


