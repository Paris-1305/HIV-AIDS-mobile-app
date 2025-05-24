/*import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle,IonCard, IonCardHeader,IonButton,
   IonToolbar, IonCardContent, IonCardTitle,IonItem, IonLabel } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  providers:[AuthService],
  imports: [IonContent, IonHeader, IonTitle,IonCard,IonCardContent,IonCardHeader,
    IonButton,IonCardTitle,IonItem,IonLabel, IonToolbar, CommonModule, FormsModule]
})
export class ForgotPasswordPage implements OnInit {
   
  email: string = '';

  constructor(
    private authService: AuthService,
    public router: Router,
    private alertController: AlertController
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  async resetPassword() {
    if (!this.email) {
      this.showAlert('Error', 'Please enter your email.');
      return;
    }
  
    try {
      await this.authService.requestPasswordReset(this.email);
      this.showAlert('Success', 'A password reset link has been sent to your email.');
      this.router.navigate(['/login']);
    } catch (error) {
      this.showAlert('Error', 'Failed to send password reset email. Please try again.');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

}*/


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonCard, IonCardHeader, IonButton,
   IonToolbar, IonCardContent, IonCardTitle, IonItem, IonLabel } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http'; // ✅ Ensure HttpClientModule is imported

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  providers:[AuthService],
  imports: [
  CommonModule, FormsModule,
    IonicModule, HttpClientModule // ✅ Add HttpClientModule to the imports array
  ]
})
export class ForgotPasswordPage {
  email: string = '';  
  isLoading = false; // ✅ Loading indicator

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async resetPassword() {
    if (!this.email) {
      this.showAlert('Error', 'Please enter your email.');
      return;
    }

    this.isLoading = true;
    try {
      await this.authService.requestPasswordReset(this.email);
      this.showAlert('Success', 'A password reset link has been sent to your email.');
      this.router.navigate(['/login']);  
    } catch (error) {
      console.error('Error requesting password reset:', error);
      this.showAlert('Error', 'Failed to send password reset email. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  Login() {
    this.router.navigate(['/login']);
  }
}

