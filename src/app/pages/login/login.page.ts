import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonCardContent, IonItem, IonButton,
  IonLabel, IonCard, IonCardHeader, IonCardTitle, IonText, IonInput
} from '@ionic/angular/standalone'
import { Router } from '@angular/router';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  providers: [AuthService],
  styleUrls: ['./login.page.scss'],
  imports: [IonInput, IonText, IonContent, IonCard, IonCardTitle, IonCardContent, HttpClientModule,
    IonItem, IonButton, IonLabel, IonCardHeader, CommonModule, FormsModule]
})
// export class LoginPage {
//   email: string = '';
//   password: string = '';
//   constructor(private authService: AuthService, private router: Router) { }

//   async loginUser() {
//     try {
//       const response = await this.authService.login(this.email, this.password);
//       console.log('Login successful', response);
//     } catch (error) {
//       console.error('Login failed', error);
//     }
//   }
//   goToRegister() {
//     this.router.navigate(['/register']);
//   }
// }

export class LoginPage {
  email: string = '';
  password: string = '';
  emailInvalid: boolean = false; // For email error display
  passwordInvalid: boolean = false; // For password error display
  emailError: string = ''; // Email-specific error message
  passwordError: string = ''; // Password-specific error message
  formSubmitted: boolean = false; // Flag to track if the form was submitted

  constructor(private authService: AuthService, public router: Router) { }


  // async loginUser() {
  //   this.formSubmitted = true;
  //   this.emailInvalid = false;
  //   this.passwordInvalid = false;
  //   this.emailError = '';
  //   this.passwordError = '';

  //   if (!this.email) {
  //     this.emailInvalid = true;
  //     this.emailError = 'Email is required.';
  //   }

  //   if (!this.password) {
  //     this.passwordInvalid = true;
  //     this.passwordError = 'Password is required.';
  //   }

  //   if (this.emailInvalid || this.passwordInvalid) return;

  //   if (!this.validatePassword(this.password)) {
  //     this.passwordInvalid = true;
  //     this.passwordError = 'Password must be at least 6 characters long, include one uppercase letter and one number.';
  //     return;
  //   }

  //   try {
  //     const response = await this.authService.login(this.email, this.password);
  //     console.log('Login successful', response);

  //     localStorage.setItem('token', response.token); // Store token
  //     this.router.navigate(['/loader']);
  //   } catch (error: any) {
  //     console.error('Login failed', error);

  //     if (error.status === 401) {
  //       this.emailInvalid = true;
  //       this.passwordInvalid = true;
  //       this.emailError = 'Invalid email or password.';
  //       this.passwordError = 'Invalid email or password.';
  //     } else {
  //       alert('An error occurred. Please try again.');
  //     }
  //   }
  // }
  // async loginUser() {
  //   try {
  //     const response = await this.authService.login(this.email, this.password);
  //     console.log("Login successful:", response);
  
  //     if (response.token) {
  //       localStorage.setItem("token", response.token);
  //       console.log("Token stored in localStorage:", localStorage.getItem("token")); // Debug
  //       this.router.navigate(["/LOADER"]);
  //     } else {
  //       console.error("Token missing in response");
  //     }
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //   }
  // }
  
  // async loginUser() {
  //   try {
  //     const response = await this.authService.login(this.email, this.password);
  //     console.log("Login successful:", response);
  
  //     if (response.token) {
  //       localStorage.setItem("token", response.token);
  //       console.log("Token stored in localStorage:", localStorage.getItem("token")); // Debugging
  
  //       this.router.navigate(["/Loader"]);
  //     } else {
  //       console.error("Token missing in response");
  //     }
  //   } catch (error: any) {
  //     console.error("Login failed:", error);
  
  //     if (error.response) {
  //       console.error("Error Response Data:", error.response.data);
  //       console.error("Error Status Code:", error.response.status);
  //     }
  
  //     if (error.status === 401) {
  //       alert("Invalid email or password.");
  //     } else {
  //       alert(`An error occurred: ${error.message}`);
  //     }
  //   }
  // }
  async loginUser() {
    try {
      const response = await this.authService.login(this.email, this.password);
      console.log("Login successful:", response);
  
      if (response.token) {
        localStorage.setItem("token", response.token);
        console.log("Token stored in localStorage:", localStorage.getItem("token")); // Debugging
  
        this.router.navigate(["/home"]);
      } else {
        console.error("Token missing in response");
      }
    } catch (error: any) {
      console.error("Login failed:", error);
  
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
        console.error("Error Status Code:", error.response.status);
      }
  
      if (error.status === 401) {
        alert("Invalid email or password.");
      } else {
        alert(`An error occurred: ${error.message}`);
      }
    }
  }
  

  logPassword() {
    console.log("Password Input:", this.password);
  }
  
  goToRegister() {
    this.router.navigate(['/register']);
  }
  
   // Navigate to the password reset page
   goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  validatePassword(password: string): boolean {
    // Minimum 6 characters, at least 1 uppercase letter, 1 number
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
  }
}






