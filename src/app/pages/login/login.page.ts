import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,IonCardContent,IonItem,IonButton,
  IonLabel,IonCard,IonCardHeader,IonCardTitle } from '@ionic/angular/standalone'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  providers:[AuthService],
  styleUrls: ['./login.page.scss'],
   imports: [IonContent,IonCard,IonCardTitle,IonCardContent,
 IonItem,IonButton, IonLabel, IonCardHeader, CommonModule, FormsModule]
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  async loginUser() {
    try {
      const response = await this.authService.login(this.email, this.password);
      console.log('Login successful', response);
    } catch (error) {
      console.error('Login failed', error);
    }
  }
}

