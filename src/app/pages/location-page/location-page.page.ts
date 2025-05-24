import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Geolocation } from '@capacitor/geolocation';  // Correct import for Capacitor 6
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import * as L from 'leaflet';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-location-page',
  templateUrl: './location-page.page.html',
  styleUrls: ['./location-page.page.scss'],
  standalone: true,
  providers:[HttpClient],
  imports: [ HttpClientModule,  IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class LocationPagePage implements OnInit, AfterViewInit {
  map: any;
  userLocation: any;
  searchQuery: string = ''; 

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUserLocation();
  }

  ngAfterViewInit() {
    this.loadMap();
  }

  async getUserLocation() {
    try {
      const resp = await Geolocation.getCurrentPosition();
      this.userLocation = resp.coords; 
      this.loadMap();  
    } catch (error) {
      console.log('Error getting location', error);
    }
  }

  loadMap() {
    if (!this.userLocation) return;

    this.map = L.map('map').setView([this.userLocation.latitude, this.userLocation.longitude], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    const userMarkerIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [0, -41],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      shadowSize: [41, 41],
      shadowAnchor: [12, 41]
    });

    // Add a marker for the user's location with the custom icon
    L.marker([this.userLocation.latitude, this.userLocation.longitude], { icon: userMarkerIcon })
      .addTo(this.map)
      .bindPopup('You are here')
      .openPopup();
  }

  async searchPlaces(query: string) {
    if (!query) return; 

    // Using OpenStreetMap Nominatim API for searching places
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&lat=${this.userLocation.latitude}&lon=${this.userLocation.longitude}&radius=5000`;

    this.http.get<any>(url).subscribe((response) => {
      const places = response;

      this.clearMarkers();

      places.forEach((place: any) => {
        const placeMarkerIcon = L.icon({
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [0, -41],
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
          shadowSize: [41, 41],
          shadowAnchor: [12, 41]
        });

        L.marker([place.lat, place.lon], { icon: placeMarkerIcon })
          .addTo(this.map)
          .bindPopup(place.display_name)
          .openPopup();
      });
    });
  }

  clearMarkers() {
    this.map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });
  }
}






// import { Component, OnInit, AfterViewInit } from '@angular/core';
// import { Geolocation } from '@capacitor/geolocation';
// import mapboxgl from 'mapbox-gl';
// import { IonicModule } from '@ionic/angular';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-location-page',
//   standalone: true,
//   imports: [IonicModule, FormsModule],
//   templateUrl: './location-page.page.html',
//   styleUrls: ['./location-page.page.scss'],
// })
// export class LocationPagePage implements OnInit, AfterViewInit {
//   map!: mapboxgl.Map;
//   userLocation: any;
//   searchQuery: string = '';
//   private mapboxToken: string = 'YOUR_MAPBOX_ACCESS_TOKEN'; 

//   constructor() {}

//   ngOnInit() {
//     this.getUserLocation();
//   }

//   ngAfterViewInit() {
//     this.loadMap();
//   }

//   async getUserLocation() {
//     try {
//       const resp = await Geolocation.getCurrentPosition();
//       this.userLocation = [resp.coords.longitude, resp.coords.latitude];
//       this.loadMap();
//     } catch (error) {
//       console.error('Error getting location', error);
//     }
//   }

//   loadMap() {
//     if (!this.userLocation) return;

//     mapboxgl.accessToken = this.mapboxToken;
//     this.map = new mapboxgl.Map({
//       container: 'map',
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: this.userLocation,
//       zoom: 12,
//     });

//     // Add user location marker
//     new mapboxgl.Marker()
//       .setLngLat(this.userLocation)
//       .setPopup(new mapboxgl.Popup().setHTML('<h4>You are here</h4>'))
//       .addTo(this.map);
//   }

//   searchPlaces(query: string) {
//     if (!query) return;

//     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?proximity=${this.userLocation[0]},${this.userLocation[1]}&access_token=${this.mapboxToken}`;

//     fetch(url)
//       .then((response) => response.json())
//       .then((data) => {
//         this.clearMarkers();

//         data.features.forEach((place: any) => {
//           new mapboxgl.Marker()
//             .setLngLat(place.center)
//             .setPopup(new mapboxgl.Popup().setHTML(`<h4>${place.text}</h4>`))
//             .addTo(this.map);
//         });
//       })
//       .catch((error) => console.error('Error fetching places:', error));
//   }

//   clearMarkers() {
//     document.querySelectorAll('.mapboxgl-marker').forEach(marker => marker.remove());
//   }
// }
