

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
// maps numeric IDs → backend keys
pageMap = {
  15: 'understanding_hiv_and_aids',
  13: 'hiv_treatment',
  6:  'hiv_prevention',
  12: 'hiv_testing',
  16: 'living_with_hiv',
  17: 'faq_section',
  18: 'hiv_and_stigma',
  19: 'hiv_and_pregnancy',
  20: 'hiv_and_womens_health',
  21: 'support_people_with_hiv',
  22: 'ending_hiv_stigma',
  23: 'staying_healthy_with_hiv',
  24: 'hiv_and_youth',
  25: 'safe_sex_practices'
};

// reverse: backend key → numeric ID
nameToIdMap: Record<string, number> = {};

// maps backend key → actual route path (hyphen vs underscore)
routeMap: Record<string,string> = {
  understanding_hiv_and_aids: 'hiv-basics',
  hiv_treatment:        'treatment',
  hiv_prevention:       'prevention',
  hiv_testing:          'testing',
  living_with_hiv:      'living_with_hiv',
  faq_section:          'faqsection',
  hiv_and_stigma:       'hiv_stigma',
  hiv_and_pregnancy:    'hiv',
  hiv_and_womens_health:'hiv-women-health',
  support_people_with_hiv:'support-people-hiv',
  ending_hiv_stigma:    'ending-hiv-stigma',
  staying_healthy_with_hiv:'staying-healthy',
  hiv_and_youth:        'hiv-youth',
  safe_sex_practices:   'safe-sex-practices'
};


ngOnInit() {
  // build reverse lookup
  for (const [id, key] of Object.entries(this.pageMap)) {
    this.nameToIdMap[key] = +id;
  }
  this.fetchRecommendations();
}

fetchRecommendations() {
  const token = localStorage.getItem('token');
  if (!token) return console.error('No token');
  const decoded: any = jwtDecode(token);
  if (!decoded?.userId) return console.error('No userId');

  this.recommendationService.getRecommendedPages(decoded.userId).subscribe({
    next: (res: any) => {
      this.recommendations = res.recommendations
        .filter((r: any) => typeof r.page === 'string')
        .map((r: {page: string}) => {
          const key = r.page;
          const id  = this.nameToIdMap[key] ?? null;
          const path = this.routeMap[key] ?? key.replace(/_/g,'-');

          return {
            title: this.formatTitle(key),
            path: `/${path}`,
            queryParams: { id }
          };
        });
    },
    error: err => console.error('Fetch recs error', err)
  });
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

