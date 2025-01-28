import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../products.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchTerm: string = '';
  products: any[] = [];
  isLoggedIn = false;
  userRole: string | null = null;

  constructor(private productService: ProductsService ,private authService: AuthService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    // Subscribe to the login state observable
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

    // Subscribe to the user role observable
    this.authService.userRole$.subscribe(role => {
      this.userRole = role;
    });
  }

  onLogin(): void {
    // You might want to redirect or perform additional actions on login
    this.authService.setLoginState(true); // Corrected method
  }

  onSignup(): void {
    // Optional: Redirect to signup page instead
    // this.router.navigate(['/signup']);
  }

  onLogout(): void {
    this.authService.logout(); // Clear login state and user role
    // Optionally, redirect to home or login page after logout
    this.router.navigate(['/login']);
  }

  isAdmin(): boolean {
    return this.userRole === 'admin';
  }

  searchProducts(): void {
    if (this.searchTerm) {
      this.productService.searchProducts(this.searchTerm).subscribe(
        (data) => {
          this.products = data;
          console.log('Products:', this.products); // Optional: Log the results for debugging
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
    } else {
      this.products = []; // Clear results if the search term is empty
    }
  }
}
