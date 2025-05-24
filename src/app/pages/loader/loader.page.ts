import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonLabel,
  IonToolbar, IonSpinner, IonItem, IonList } from '@ionic/angular/standalone';
import { FolderPage } from "../../folder/folder.page";
import { RouterModule } from '@angular/router';
import { RecommendationService } from 'src/app/services/recommendation.service';
import { AuthService } from 'src/app/services/auth.service';
//import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
  standalone: true,
  providers: [RecommendationService, AuthService],
  imports: [IonList, IonItem, IonSpinner,IonLabel, RouterModule,
     IonContent, CommonModule, FormsModule, FolderPage]
})
export class LoaderPage implements OnInit {
  
  // recommendedPages: any[] = [];

  // constructor(
  //   private authService: AuthService,
  //   private recommendationService: RecommendationService
  // ) {}

  // ngOnInit(): void {
  //   // Check if user is logged in
  //   const userId = this.authService.getUserId();
  //   if (userId) {
  //     this.fetchRecommendations(userId);
  //   }
  // }

  // fetchRecommendations(userId: number): void {
  //   this.recommendationService.getRecommendedPages(userId).subscribe(
  //     pages => {
  //       this.recommendedPages = pages;
  //     },
  //     error => console.error('Error fetching recommendations:', error)
  //   );
  // }

  constructor(){}

  ngOnInit():void{

  }
}
