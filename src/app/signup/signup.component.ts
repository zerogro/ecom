import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  model: User = {
    name: '',
    email: '',
    password: ''
  };
  
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  get passwordMismatch(): boolean {
    // Ensure both are strings and check if they are equal
    return !!this.model.password && !!this.confirmPassword && this.model.password !== this.confirmPassword;
  }

  onSubmit() {
    if (this.passwordMismatch) {
      console.error('Passwords do not match');
      return;
    }
    
    this.authService.register(this.model).subscribe(
      response => {
        console.log('User signed up successfully:', response);
        this.router.navigate(['/login']); // Navigate to login after successful signup
      },
      error => {
        console.error('Signup error:', error);
      }
    );
  }
}
