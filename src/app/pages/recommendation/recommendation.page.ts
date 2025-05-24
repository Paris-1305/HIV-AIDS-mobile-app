
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader,IonCard, IonCardContent,IonCardHeader,IonCardTitle,
  IonTitle,IonButton, IonToolbar } from '@ionic/angular/standalone';
import { ContentService } from 'src/app/services/content.service';
import { AuthService } from 'src/app/services/auth.service';
import { RouterModule } from '@angular/router';
import { RecommendationService } from 'src/app/services/recommendation.service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.page.html',
  styleUrls: ['./recommendation.page.scss'],
  standalone: true,
  providers:[AuthService,RecommendationService],
  imports: [IonContent, IonHeader, IonTitle, IonCard,IonCardContent,IonCardTitle,IonButton,
 RouterModule, IonCardHeader, IonCardTitle, IonToolbar, CommonModule, FormsModule]
})


export class RecommendationPage  implements OnInit {
  recommendedPages: any[] = [];
  userId: number | null = null;

  constructor(
    private recommendationService: RecommendationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserId(); // Get logged-in user's ID
    if (this.userId) {
      this.loadRecommendations();
    }
  }

  loadRecommendations() {
    this.recommendationService.getRecommendedPages(this.userId!).subscribe(
      (pages) => {
        this.recommendedPages = pages;
        console.log('Recommended Pages:', pages);
      },
      (error) => {
        console.error('Error fetching recommendations:', error);
      }
    );
  }
}
