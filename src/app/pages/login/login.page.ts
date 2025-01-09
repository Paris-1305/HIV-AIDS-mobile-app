import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,IonLabel,IonInput, IonButton, IonCard,IonCardContent,IonCardHeader,
  IonHeader, IonTitle,IonCardTitle, IonToolbar,IonItem } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent,IonItem,IonLabel, IonInput, IonButton, IonCard,IonCardHeader,
   IonCardContent, IonHeader, IonTitle, IonCardTitle, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  authService: any;
  router: any;

  constructor() {}
  ngOnInit(): void {
    // You can add additional initialization logic here if needed
  }
  login(): void {
    // Call the login method in the authService with email and password
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe(
        (response: { token: any; }) => {
          if (response.token) {
            this.authService.saveToken(response.token);
            this.router.navigate(['/home']);
          } else {
            console.log('Invalid credentials');
          }
        },
        (error: any) => {
          console.log('Login error:', error);
        }
      );
    } else {
      console.log('Please fill in both email and password');
    }
  }
}
