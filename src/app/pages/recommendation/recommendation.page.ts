/*
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ContentService } from 'src/app/services/content.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.page.html',
  styleUrls: ['./recommendation.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})

interface Page {
  id: string; // Unique identifier for the page
  name: string; // Name of the page
  contentVector: number[]; // Content vector for recommendation calculations
}

export class RecommendationPage  implements OnInit {

  recommendations: Page[] = [];
  userProfile: any; // User's profile data from the backend
  userId: string | undefined; // User ID fetched from the auth service
  isLoading = true; // To manage the loading state
  errorMessage = ''; // To store any error messages

  constructor(
    private authService: AuthService,
    private contentService: ContentService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getAuthenticatedUserId() || '';
    // Step 1: Fetch the user profile and ID
    this.authService.getUserProfile(this.userId).subscribe(
      (userProfile) => {
        this.userProfile = userProfile.profile;
        this.userId = userProfile.profile.userId;

        // Step 2: Generate recommendations after fetching the user profile
        this.generateRecommendations();
      },
      (error) => {
        console.error('Failed to fetch user profile:', error);
        this.errorMessage = 'Unable to fetch user profile.';
        this.isLoading = false;
      }
    );
  }

  generateRecommendations() {
    // Step 3: Fetch pages from the backend
    this.contentService.getAllPages().subscribe(
      (pages: Page[]) => {
        if (!this.userProfile.profileVector) {
          console.warn('Profile vector is missing.');
          this.isLoading = false;
          return;
        }

        // Step 4: Calculate similarity and sort pages by relevance
        this.recommendations = pages
          .map((page) => ({
            ...page,
            similarity: this.calculateCosineSimilarity(
              this.userProfile.profileVector,
              page.contentVector
            ),
          }))
          .sort((a, b) => b.similarity - a.similarity); // Sort by similarity score
        this.isLoading = false;
      },
      (error) => {
        console.error('Failed to fetch pages:', error);
        this.errorMessage = 'Unable to fetch pages.';
        this.isLoading = false;
      }
    );
  }

  // Cosine similarity calculation
  calculateCosineSimilarity(vectorA: number[], vectorB: number[]): number {
    if (!vectorA || !vectorB || vectorA.length !== vectorB.length) {
      console.warn('Invalid vectors for cosine similarity calculation.');
      return 0; // Return 0 similarity for invalid inputs
    }
    const dotProduct = vectorA.reduce((sum, val, i) => sum + val * vectorB[i], 0);
    const magnitudeA = Math.sqrt(vectorA.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(vectorB.reduce((sum, val) => sum + val * val, 0));

    return dotProduct / (magnitudeA * magnitudeB);
  }
}
*/