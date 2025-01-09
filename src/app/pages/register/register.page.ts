import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonCard,IonCardContent,IonCardHeader,IonSelect,
  IonCardTitle,IonItem, IonLabel,IonInput, IonSelectOption,
 IonButton, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader,  IonCard,IonCardContent,IonCardHeader,IonCardTitle,IonItem,
    IonSelectOption,IonButton,
IonSelect, IonInput, IonLabel,IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RegisterPage implements OnInit {
  
  email: string = '';
  password: string = '';
  gender: string = '';
  age: string = '';
  educationLevel: string = '';
  sexualActivity: string = '';
  maritalStatus: string = '';
  testingHistory: string = '';
  hivStatus: string = '';
  authService: any;
  router: any;

  constructor() { }

  ngOnInit() {
  }

  register() {
    // Validate form fields
    if (
      !this.email ||
      !this.password ||
      !this.gender ||
      !this.age ||
      !this.educationLevel ||
      !this.maritalStatus ||
      !this.testingHistory ||
      !this.hivStatus
    ) {
      return;
    }

    const userData = {
      email: this.email,
      password: this.password,
      gender: this.gender,
      age: this.age,
      educationLevel: this.educationLevel,
      maritalStatus: this.maritalStatus,
      testingHistory: this.testingHistory,
      hivStatus: this.hivStatus,
    };
  // Call the AuthService to handle registration
  this.authService.register(userData).subscribe(
    (response: any) => {
      console.log('Registration successful:', response);
      this.router.navigate(['/home']); // Navigate to the home page
    },
    (error: any) => {
      console.error('Registration failed:', error);
    }
  );
  }
  
  
 

  }
