import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../api-response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginError: string | null = null; // To store any login error message
  successMessage: string | null = null; // To store successful login message

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit(): void {
    // Check for admin login
    if (this.email === 'admin' && this.password === 'admin') {
      this.successMessage = 'Admin login successful!';
      this.authService.setLoginState(true, 'admin'); // Set user role to admin
      this.router.navigate(['/admin/products/new']); // Navigate to the admin form component
    } else if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe(
        (response: ApiResponse) => {
          this.successMessage = response.message; // Set the success message
          console.log('Login successful:', response.message);
          this.authService.setLoginState(true, 'user'); // Set user role to regular user
          this.router.navigate(['home']); // Navigate to home on success
        },
        (error: HttpErrorResponse) => {
          console.error('Login error:', error);
          this.successMessage = null; // Clear success message
          if (error.error instanceof ErrorEvent) {
            // Client-side error
            this.loginError = 'An unexpected error occurred. Please try again later.';
          } else {
            // Server-side error
            this.loginError = error.error.message || 'Invalid email or password. Please try again.'; // Show specific error message
          }
        }
      );
    } else {
      this.loginError = 'Please enter both email and password.';
      console.error('Invalid login attempt');
    }
  }

  // Optional: Context menu logic
  showContextMenu(event: MouseEvent): void {
    console.log('Context menu shown at:', event.clientX, event.clientY);
  }
}
