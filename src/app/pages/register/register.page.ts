import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonCard,IonCardContent,IonCardHeader,IonSelect,
  IonCardTitle,IonItem, IonLabel,IonInput, IonSelectOption, IonText,
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
    IonSelectOption,IonButton,  HttpClientModule, ReactiveFormsModule,
IonSelect, IonInput, IonLabel,IonTitle, IonToolbar, CommonModule, FormsModule]
})
// export class RegisterPage implements OnInit {
  
//   email: string = '';
//   password: string = '';
//   gender: string = '';
//   age: string = '';
//   educationLevel: string = '';
//   sexualActivity: string = '';
//   maritalStatus: string = '';
//   testingHistory: string = '';
//   hivStatus: string = '';

//   constructor(private authService: AuthService, private router: Router) { }

//   ngOnInit() {}
   
//   async register() {
//     // Validate form fields
//     if (
//       !this.email ||
//       !this.password ||
//       !this.gender ||
//       !this.age ||
//       !this.educationLevel ||
//       !this.maritalStatus ||
//       !this.testingHistory ||
//       !this.hivStatus
//     ) {
//       alert('Please fill in all fields.');
//       return;
//     }

//     const userData = {
//       email: this.email,
//       password: this.password,
//       gender: this.gender,
//       age: this.age,
//       education_level: this.educationLevel,
//       sexual_activity: this.sexualActivity,
//       marital_status: this.maritalStatus,
//       testing_history: this.testingHistory,
//       hiv_status: this.hivStatus,
//     };

//     console.log('Sending data:', userData);

//     try {
//       const response = await this.authService.register(
//       userData.email,
//       userData.password,
//       userData.gender,
//       userData.age,
//       userData.education_level,
//       userData.sexual_activity,
//       userData.marital_status,
//       userData.testing_history,
//       userData.hiv_status
//       );
//       console.log('Registration successful:', response);
//       console.log('Navigating to loader page...');
//       this.router.navigate(['/loader']); // Navigate to home page
//     } catch (error) {
//       console.error('Registration failed:', error);
//     }
//   }

// }

export class RegisterPage implements OnInit {

  registerForm: FormGroup;

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

