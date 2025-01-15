import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonSpinner,
   IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ContentService } from 'src/app/services/content.service';
import { UserService } from 'src/app/services/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-hivbasics',
  templateUrl: './hivbasics.page.html',
  styleUrls: ['./hivbasics.page.scss'],
  standalone: true,
  providers:[ContentService,UserService],
  imports: [IonContent, IonHeader, IonTitle, IonSpinner, HttpClientModule,
    IonToolbar, CommonModule, FormsModule]
})
export class HIVBasicsPage implements OnInit, OnDestroy {
content: any = null; // Dynamic content
  private startTime!: number;
  private pageId = 'prevention'; // Unique identifier for the page

  constructor(
    private contentService: ContentService,
    private userService: UserService
  ) {
  
  }

  ngOnInit() {
    this.startTime = Date.now();
    //this.user=this.userService.trackClick()
    this.loadContent();
  }

  // Load dynamic content from the database
  
  loadContent() {
    this.contentService.getPageContent(this.pageId).subscribe({
      next: (response) => {
        this.content = response;
      },
      error: (err) => {
        console.error('Failed to fetch content', err);
      },
    });
  }

  // Track clicks and interactions
  trackClick(event: Event, contentId: string) {
    this.userService.logInteraction({
      type: 'click',
      pageId: this.pageId,
      contentId: contentId,
      timestamp: new Date().toISOString(),
    }).subscribe({
      next: () => console.log('Interaction logged'),
      error: (err) => console.error('Failed to log interaction', err),
    });
  }

  // Log time spent when leaving the page
  ngOnDestroy() {
    const timeSpent = (Date.now() - this.startTime) / 1000; // Time in seconds
    this.userService.logInteraction({
      type: 'time_spent',
      pageId: this.pageId,
      duration: timeSpent,
      timestamp: new Date().toISOString(),
    }).subscribe({
      next: () => console.log('Time spent logged'),
      error: (err) => console.error('Failed to log time spent', err),
    });
  }
  

}
