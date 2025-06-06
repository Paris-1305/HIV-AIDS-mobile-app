
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule, Router } from '@angular/router';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { AuthService } from '../../services/auth.service';
// import { RecommendationService } from '../../services/recommendation.service';
// import { jwtDecode } from "jwt-decode";
// import { 
//   IonHeader, 
//   IonToolbar, 
//   IonTitle, 
//   IonContent, 
//   IonButton, 
//   IonIcon, 
//   IonSearchbar, 
//   IonList, 
//   IonItem, 
//   IonLabel,
//   IonCard,
//   IonCardHeader,
//   IonCardTitle,
//   IonCardContent,
//   IonGrid,
//   IonRow,
//   IonCol,
//   IonCardSubtitle
// } from '@ionic/angular/standalone';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { register } from 'swiper/element/bundle';

// // Register Swiper web components
// register();

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.page.html',
//   styleUrls: ['./home.page.scss'],
//   providers: [AuthService,RecommendationService],
//   standalone: true,
//   schemas: [CUSTOM_ELEMENTS_SCHEMA],
//   imports: [
//     CommonModule, 
//     FormsModule, 
//     RouterModule, 
//     HttpClientModule, 
//     IonHeader,
//     IonToolbar,
//     IonTitle,
//     IonContent,
//     IonButton,
//     IonIcon,
//     IonSearchbar,
//     IonList,
//     IonItem,
//     IonLabel,
//     IonCard,
//     IonCardHeader,
//     IonCardTitle,
//     IonCardContent,
//     IonGrid,
//     IonRow,
//     IonCol,
//     IonCardSubtitle
//   ]
// })
// export class HomePage implements OnInit {
//   searchQuery: string = '';
//   searchResults: string[] = [];
//   recommendations: any[] = [];
  
//   swiperConfig = {
//     slidesPerView: 1.2,
//     spaceBetween: 16,
//     centeredSlides: true,
//     initialSlide: 1
//   };

//   pageMap: { [key: number]: string } = {
//     6: 'prevention',
//     12: 'testing',
//     13: 'treatment',
//     15: 'hiv_basics',
//     16: 'living_with_hiv',
//     18: 'hiv_stigma',
//     19: 'hivpregnancy',
//     17: 'faqsection',
//     20: 'hiv_women_health',
//     21: 'support_people_with_hiv',
//     22: 'ending_hiv_stigma',
//     23: 'staying_healthy_with_hiv',
//     24: 'hiv_and_youth',
//     25: 'safe_sex_practices'
//   };

//   quickLinks = [
//     { title: 'Prevention', icon: 'shield-checkmark', link: '/prevention', queryParams: { id: 6 } },
//     { title: 'Testing', icon: 'flask', link: '/testing', queryParams: { id: 12 } },
//     { title: 'Treatment', icon: 'medkit', link: '/treatment', queryParams: { id: 13 } },
//     { title: 'Living with HIV', icon: 'heart', link: '/living-with-hiv', queryParams: { id: 16 } }
//   ];
  
//   featuredArticles = [
//     {
//       title: "New HIV Prevention Strategies",
//       summary: "Explore the latest methods to prevent HIV transmission...",
//       image: "assets/news1.jpg",
//       link: "/prevention"
//     },
//     {
//       title: "Advancements in HIV Treatment",
//       summary: "Recent breakthroughs in ART therapy...",
//       image: "assets/news2.jpg",
//       link: "/treatment"
//     }
//   ];

//   constructor(
//     private router: Router, 
//     private http: HttpClient, 
//     public authService: AuthService,
//     private recommendationService: RecommendationService
//   ) {}

//   ngOnInit() {
//     this.fetchRecommendations();
//   }

//   fetchRecommendations() {
//     const token = localStorage.getItem("token");
//     if (!token) {
//         console.error("No authentication token found!");
//         return;
//     }
//     const decodedToken: any = jwtDecode(token);
//     const userId = decodedToken?.userId;

//     if (!userId) {
//         console.error("Invalid token: userId not found");
//         return;
//     }
//     this.http.get(`https://hiveducationalmobilebackend.onrender.com/recommendations/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//     }).subscribe(
//         (response: any) => {
//             console.log("Raw API Response:", response);

//             if (!response.recommendations || response.recommendations.length === 0) {
//                 console.warn("No recommendations received.");
//                 this.recommendations = [];
//                 return;
//             }
//             const reversePageMap: { [key: string]: number } = {};
//             Object.entries(this.pageMap).forEach(([id, name]) => {
//                 reversePageMap[name] = Number(id);
//             });
//             console.log("Reverse Page Map:", reversePageMap);

//             this.recommendations = response.recommendations.map((rec: any) => {
//                 const pageId = reversePageMap[rec.page];
//                 if (!pageId) {
//                     console.warn(`No page ID found for: ${rec.page}`);
//                     return {
//                       title: this.formatTitle(rec.page.replace(/_/g, ' ')),
//                       path: `/${rec.page}`,
//                       queryParams: { id: null }
//                     };
//                 }
//                 return {
//                     title: this.formatTitle(this.pageMap[pageId]),
//                     path: `/${this.pageMap[pageId]}`,
//                     queryParams: { id: pageId }
//                 };
//             });
//             console.log("Formatted Recommendations:", this.recommendations);
//         },
//         (error) => {
//             console.error("Error fetching recommendations:", error);
//         }
//     );
//   }
 
//   formatTitle(page: string): string {
//     return page
//       .replace(/-/g, " ")
//       .replace(/\b\w/g, (char) => char.toUpperCase());
//   }

//   navigateTo(path: string, queryParams?: any) {
//     this.router.navigate([path], { queryParams });
//   }

//   searchTopics(event: Event) {
//     const searchValue = (event.target as HTMLIonSearchbarElement).value?.toLowerCase() || '';
//     const allTopics = ['HIV Basics', 'Prevention', 'Testing', 'Treatment', 'Living with HIV', 'HIV & Pregnancy'];
//     this.searchResults = allTopics.filter(topic => topic.toLowerCase().includes(searchValue));
//   }

//   goToTopic(topic: string) {
//     this.router.navigate(['/topic-details', { topic }]);
//   }

//   readMore(link: string) {
//     this.router.navigate([link]);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RecommendationService } from '../services/recommendation.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
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
  ) {}

  ngOnInit() {
    this.fetchRecommendations();
  }
  pageMapInverse(route: string): number | null {
    for (const [id, name] of Object.entries(this.pageMap)) {
      if (name === route) {
        return Number(id);
      }
    }
    return null;
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
  
        // Create reverse mapping from our pageMap.
        // Normalize the names by replacing hyphens with underscores.
        const reversePageMap: { [key: string]: number } = {};
        Object.entries(this.pageMap).forEach(([id, name]) => {
          const normalized = name.toLowerCase().replace(/[-]/g, '_');
          reversePageMap[normalized] = Number(id);
        });
  
        // Mapping object to convert recommended page names to actual route strings.
        // Adjust these keys so that they match the names returned from your backend (normalized)
        // and the values match the routes defined in your app.routes.
        const recRouteMapping: { [key: string]: string } = {
          'hiv_testing': 'testing',
          'understanding_hiv_and_aids': 'hiv_basics',
          'hiv_and_stigma': 'hiv_stigma',       // Note: make sure you have a route for this!
          'safe_sex_practices': 'safe-sex-practices',
          'ending_hiv_stigma': 'ending-hiv-stigma',
          'support_people_with_hiv':'support-people-hiv',
          'safe_sex_practices':'safe-sex-practices',
          'staying_healthy_with_hiv':'staying-healthy',
          'hiv_and_youth':'hiv-youth',
          'hiv_and_pregnancy':'hiv',
          'hiv_and_womens_health':'hiv-women-health'
          // Add more mappings as needed.
        };
  
        this.recommendations = response.recommendations.map((rec: any) => {
          // Normalize the returned rec.page string
          let pageKey = rec.page?.toLowerCase().replace(/[-]/g, '_');
          // If there's a mapping defined, use it; otherwise use the normalized key.
          const mappedRoute = recRouteMapping[pageKey] || pageKey;
          // Look up the page ID from the reverse mapping or by checking our pageMap.
          const pageId = reversePageMap[pageKey] || this.pageMapInverse(mappedRoute);
  
          return {
            title: this.formatTitle(mappedRoute), // or rec.page if you prefer
            path: `/${mappedRoute}`,
            queryParams: { id: pageId || null }
          };
        });
  
      },
      (error) => {
        console.error("Error fetching recommendations:", error);
      }
    );
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
