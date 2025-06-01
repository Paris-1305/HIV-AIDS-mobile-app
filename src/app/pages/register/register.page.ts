import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonCard,IonCardContent,IonCardHeader,IonSelect,
 IonIcon,IonBackButton,IonButtons, IonCardTitle,IonItem, IonLabel,IonInput, IonSelectOption, IonText,
 IonButton, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async } from 'rxjs';
import { passwordStrengthValidator } from 'src/app/validators/password-strength.validator';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  providers:[AuthService],
  imports: [IonContent, IonHeader,IonText,  IonCard,IonCardContent,IonCardHeader,IonCardTitle,IonItem,
    IonSelectOption,IonButton,  HttpClientModule,
    IonIcon,IonBackButton,IonButtons, ReactiveFormsModule,
IonSelect, IonInput, IonLabel,IonTitle, IonToolbar, CommonModule, FormsModule]
})

export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  showPassword = false;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        passwordStrengthValidator() // Add the custom password validator
      ]],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      educationLevel: ['', Validators.required],
      sexualActivity: [''],
      maritalStatus: ['', Validators.required],
      testingHistory: ['', Validators.required],
      hivStatus: ['', Validators.required],
    });
  }

  ngOnInit() {}

    // Toggle password visibility
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }
  
    // Check if string contains uppercase letter
    hasUpperCase(str: string): boolean {
      return /[A-Z]/.test(str || '');
    }
  
    // Check if string contains special character
    hasSpecialChar(str: string): boolean {
      return /[!@#$%^&*(),.?":{}|<>]/.test(str || '');
    }

  async register() {
    if (this.registerForm.invalid) {
      console.log('Form Errors:', this.registerForm.errors);
      alert('Please fill in all required fields with valid data.');
      return;
    }

    const userData = this.registerForm.value;

    console.log('Sending data:', userData);

    try {
      const response = await this.authService.register(
        userData.email,
        userData.password,
        userData.gender,
        userData.age,
        userData.educationLevel,
        userData.sexualActivity,
        userData.maritalStatus,
        userData.testingHistory,
        userData.hivStatus
      );
      console.log('Registration successful:', response);
      this.router.navigate(['/loader']);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  }
  
  goToLogin(){
    this.router.navigate(['/login']);
  }
}

