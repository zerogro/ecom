import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../admin/product.model';
import { CartService } from '../cart.service'; // Import the CartService

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  productList: Product[] = []; // List of all products
  hotDeals: Product[] = []; // List of hot deals
  categories: string[] = ['Electronics', 'Clothing', 'Books']; // Example categories
  selectedCategory: string = ''; // For category selection
  loading: boolean = true; // Loading state
  error: string | null = null; // Error messages

  constructor(
    private productData: ProductsService,
    private cartService: CartService // Inject the CartService
  ) {}

  ngOnInit(): void {
    this.getProductData();  
  }

  // Fetch all products
  getProductData(): void {
    this.productData.getAllProducts().subscribe(
      (response: Product[]) => {
        this.productList = response;
        this.selectHotDeals(); // Select hot deals after fetching products
        this.loading = false;
      },
      (error: any) => {
        this.error = 'Failed to load products. Please try again later.';
        console.error('Error fetching products:', error);
        this.loading = false;
      }
    );
  }

  // Select random hot deals
  selectHotDeals(): void {
    const randomProducts = this.productList
      .sort(() => 0.5 - Math.random()) // Shuffle the array
      .slice(0, 3); // Take the first three products
    this.hotDeals = randomProducts;
  }

  // Filter products by selected category
  filterByCategory(): void {
    if (this.selectedCategory) {
      this.productData.getProductsByCategory(this.selectedCategory).subscribe(
        (response: Product[]) => {
          this.productList = response;
          this.selectHotDeals(); // Re-select hot deals for the filtered products
        },
        (error: any) => {
          this.error = 'Failed to load products for this category.';
          console.error('Error fetching products by category:', error);
        }
      );
    } else {
      this.getProductData(); // Reload all products if no category is selected
    }
  }

  // Add a product to the cart
  addToCart(product: Product): void {
    const cartItem = {
      name: product.name,
      price: product.price,
      quantity: 1 // Default quantity when added
    };
    this.cartService.addToCart(cartItem);
    alert(`${product.name} has been added to your cart!`); // Optional: Notify the user
  }
}
