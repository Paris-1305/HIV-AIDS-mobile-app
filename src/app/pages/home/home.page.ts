

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RecommendationService } from '../../services/recommendation.service';


import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCardSubtitle, IonButtons
} from '@ionic/angular/standalone';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  providers: [AuthService, RecommendationService],
  styleUrls: ['./home.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonButtons,
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonSearchbar,
    IonList,
    IonItem,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCardSubtitle, CommonModule,
  ]
})
export class HomePage implements OnInit {
  searchQuery: string = '';
  searchResults: string[] = [];
  recommendations: any[] = [];

  swiperConfig = {
    slidesPerView: 1.2,
    spaceBetween: 16,
    centeredSlides: true,
    initialSlide: 1
  };

  // Ensure consistent underscore naming
  pageMap: { [key: number]: string } = {
    15: 'hiv_basics',
    13: 'treatment',
    6: 'prevention',
    12: 'testing',
    16: 'living_with_hiv',
    17: 'faqsection',
    18: 'hiv_and_stigma',
    19: 'hiv',
    20: 'hiv_and_womens_health',
    21: 'support_people_with_hiv',
    22: 'ending_hiv_stigma',
    23: 'staying_healthy',
    24: 'hiv_and_youth',
    25: 'safe_sex_practices'
  };

  quickLinks = [
    { title: 'Prevention', icon: 'shield-checkmark', link: '/prevention', queryParams: { id: 6 } },
    { title: 'Testing', icon: 'flask', link: '/testing', queryParams: { id: 12 } },
    { title: 'Treatment', icon: 'medkit', link: '/treatment', queryParams: { id: 13 } },
    { title: 'Living with HIV', icon: 'heart', link: '/living_with_hiv', queryParams: { id: 16 } }
  ];

  featuredArticles = [
    {
      title: "New HIV Prevention Strategies",
      summary: "Explore the latest methods to prevent HIV transmission...",
      image: "assets/news1.jpg",
      link: "/prevention"
    },
    {
      title: "Advancements in HIV Treatment",
      summary: "Recent breakthroughs in ART therapy...",
      image: "assets/news2.jpg",
      link: "/treatment"
    }
  ];

  constructor(
    private router: Router,
    public authService: AuthService,
    private recommendationService: RecommendationService
  ) { }

  ngOnInit() {
    this.fetchRecommendations();
  }

  // fetchRecommendations() {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     console.error("No authentication token found!");
  //     return;
  //   }

  //   const decodedToken: any = jwtDecode(token);
  //   const userId = decodedToken?.userId;

  //   if (!userId) {
  //     console.error("Invalid token: userId not found");
  //     return;
  //   }

  //   this.recommendationService.getRecommendedPages(userId).subscribe(
  //     (response: any) => {
  //       if (!response.recommendations || response.recommendations.length === 0) {
  //         this.recommendations = [];
  //         return;
  //       }

  //       // Reverse map (normalized)
  //       const reversePageMap: { [key: string]: number } = {};
  //       Object.entries(this.pageMap).forEach(([id, name]) => {
  //         const normalized = name.toLowerCase().replace(/[-]/g, '_');
  //         reversePageMap[normalized] = Number(id);
  //       });

  //       this.recommendations = response.recommendations.map((rec: any) => {
  //         const pageKey = rec.page?.toLowerCase().replace(/[-]/g, '_');
  //         const pageId = reversePageMap[pageKey];

  //         return {
  //           title: this.formatTitle(pageKey || rec.page),
  //           path: `/${pageKey}`,
  //           queryParams: { id: pageId || null }
  //         };
  //       });
  //     },
  //     (error) => {
  //       console.error("Error fetching recommendations:", error);
  //     }
  //   );
  // }
  fetchRecommendations() {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found!");
      return;
    }

    const decodedToken: any = jwtDecode(token);
    const userId = decodedToken?.userId;

    if (!userId) {
      console.error("Invalid token: userId not found");
      return;
    }

    this.recommendationService.getRecommendedPages(userId).subscribe(
      (response: any) => {
        if (!response.recommendations || response.recommendations.length === 0) {
          this.recommendations = [];
          return;
        }

        // Create normalized mapping from backend names to our route names
        const routeMapping: { [key: string]: string } = {
          'hiv_testing': 'testing',
          'understanding_hiv_and_aids': 'understanding-hiv-and-aids',
          'hiv_and_stigma': 'hiv-and-stigma',
          'safe_sex_practices': 'safe-sex-practices',
          'ending_hiv_stigma': 'ending-hiv-stigma',
          'support_people_with_hiv': 'support-people-with-hiv',
          'hiv_and_womens_health': 'hiv-and-womens-health',
          'hiv_and_youth': 'hiv-and-youth',
          'hiv_and_pregnancy': 'hiv'
        };

        this.recommendations = response.recommendations
          .filter((rec: { page: any; }) => rec.page) // Filter out invalid entries
          .map((rec: { page: string }) => {
            // Normalize the backend page name (replace underscores with hyphens)
            const normalizedBackendName = rec.page.toLowerCase().replace(/_/g, '-');

            // Get the correct route name (either from mapping or use normalized name)
            const routeName = routeMapping[rec.page] || normalizedBackendName;

            // Find the page ID
            const pageId = this.pageMapInverse(routeName);

            return {
              title: this.formatTitle(routeName),
              path: `/${routeName}`,
              queryParams: { id: pageId || null }
            };
          });
      },
      (error) => {
        console.error("Error fetching recommendations:", error);
      }
    );
  }

  // Helper function to find ID from route name
  pageMapInverse(routeName: string): number | null {
    for (const [id, name] of Object.entries(this.pageMap)) {
      if (name === routeName) {
        return Number(id);
      }
    }
    return null;
  }

  formatTitle(page: string): string {
    return page
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  navigateTo(path: string, queryParams?: any) {
    if (!path) return;
    this.router.navigate([path], { queryParams });
  }

  searchTopics(event: Event) {
    const searchValue = (event.target as HTMLIonSearchbarElement).value?.toLowerCase() || '';
    const allTopics = ['HIV Basics', 'Prevention', 'Testing', 'Treatment', 'Living with HIV', 'HIV & Pregnancy'];
    this.searchResults = allTopics.filter(topic => topic.toLowerCase().includes(searchValue));
  }

  goToTopic(topic: string) {
    this.router.navigate(['/topic-details', { topic }]);
  }

  readMore(link: string) {
    this.router.navigate([link]);
  }
}
