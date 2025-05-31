
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from "jwt-decode";
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
  IonCardSubtitle
} from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';

// Register Swiper web components
register();

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [AuthService],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
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
    IonCardSubtitle
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

  pageMap: { [key: number]: string } = {
    6: 'prevention',
    12: 'testing',
    13: 'treatment',
    15: 'hiv_basics',
    16: 'living_with_hiv',
    18: 'hiv_stigma',
    19: 'hivpregnancy',
    20: 'faqsection'
  };

  quickLinks = [
    { title: 'Prevention', icon: 'shield-checkmark', link: '/prevention', queryParams: { id: 6 } },
    { title: 'Testing', icon: 'flask', link: '/testing', queryParams: { id: 12 } },
    { title: 'Treatment', icon: 'medkit', link: '/treatment', queryParams: { id: 13 } },
    { title: 'Living with HIV', icon: 'heart', link: '/living-with-hiv', queryParams: { id: 16 } }
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
    private http: HttpClient, 
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.fetchRecommendations();
  }

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
    this.http.get(`https://hiveducationalmobilebackend.onrender.com/recommendations/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
    }).subscribe(
        (response: any) => {
            console.log("Raw API Response:", response);

            if (!response.recommendations || response.recommendations.length === 0) {
                console.warn("No recommendations received.");
                this.recommendations = [];
                return;
            }
            const reversePageMap: { [key: string]: number } = {};
            Object.entries(this.pageMap).forEach(([id, name]) => {
                reversePageMap[name] = Number(id);
            });
            console.log("Reverse Page Map:", reversePageMap);

            this.recommendations = response.recommendations.map((rec: any) => {
                const pageId = reversePageMap[rec.page];
                if (!pageId) {
                    console.warn(`No page ID found for: ${rec.page}`);
                    return {
                      title: this.formatTitle(rec.page.replace(/_/g, ' ')),
                      path: `/${rec.page}`,
                      queryParams: { id: null }
                    };
                }
                return {
                    title: this.formatTitle(this.pageMap[pageId]),
                    path: `/${this.pageMap[pageId]}`,
                    queryParams: { id: pageId }
                };
            });
            console.log("Formatted Recommendations:", this.recommendations);
        },
        (error) => {
            console.error("Error fetching recommendations:", error);
        }
    );
  }
 
  formatTitle(page: string): string {
    return page
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  navigateTo(path: string, queryParams?: any) {
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