import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonSearchbar,
  IonButtons,
  IonMenuButton,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRouterLink,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    // RouterLink,
    FormsModule,
    CommonModule,
    IonApp,
    IonMenu,
    IonContent,
    IonList,
    IonToolbar,
    IonTitle,
    IonSearchbar,
    IonMenuButton,
    IonButtons,
    IonHeader,
    // IonMenuToggle,
    IonItem,
    IonLabel,
    // IonRouterLink,
    IonRouterOutlet,
  ],
})

export class AppComponent {
  // All app pages
  public appPages = [
    { title: 'HIV Basics', action: () => this.router.navigate(['/hiv_basics'], { queryParams: { id: 15 } }) },
    { title: 'Prevention', action: () => this.router.navigate(['/prevention'], { queryParams: { id: 6 } }) }, // ✅ Correct function
    { title: 'Treatment', action: () => this.router.navigate(['/treatment'], { queryParams: { id: 13 } }) },
    { title: 'HIV & Stigma', action: () => this.router.navigate(['/hiv_stigma'], { queryParams: { id: 18 } }) },
    { title: 'HIV & Pregnancy', action: () => this.router.navigate(['/hiv'], { queryParams: { id: 19 } }) },
    { title: 'Living With HIV', action: () => this.router.navigate(['/living_with_hiv'], { queryParams: { id: 16 } }) },
    { title: 'faqsection', action: () => this.router.navigate(['/living_with_hiv'], { queryParams: { id: 17 } }) },
    { title: 'Testing', action: () => this.router.navigate(['/testing'], { queryParams: { id: 12 } }) },
    { title: 'map-page ', action: () => this.router.navigate(['/map-page']) },
  ];

  // Store the current search query
  public searchQuery: string = '';

  // Store filtered pages based on the search query
  public filteredPages: { title: string; url?: string; action?: () => void }[] = [];

  constructor(public router: Router) { // ✅ Make router public so it can be used in the template
    // Initially, display all pages
    this.filteredPages = this.appPages;
  }

  // Function to filter pages based on the search query
  onSearch(): void {
    console.log('Searching for:', this.searchQuery);
    const query = this.searchQuery.toLowerCase().trim();

    if (query) {
      // Filter the appPages array based on title matching the search query
      this.filteredPages = this.appPages.filter((page) =>
        page.title.toLowerCase().includes(query)
      );
    } else {
      // Reset to all pages when search query is empty
      this.filteredPages = this.appPages;
    }
  }
}