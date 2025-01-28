import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import { CartService } from '../cart.service'; // Import the CartService

interface CartItem {
  name: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = []; // Start with an empty cart
  isVisible = false; // To control the visibility of the cart

  constructor(private cartService: CartService) {} // Inject CartService

  ngOnInit(): void {
    this.cartItems = this.cartService.getItems(); // Retrieve cart items on initialization
  }

  // Toggle cart visibility
  toggleCart(): void {
    this.isVisible = !this.isVisible;
    if (this.isVisible) {
      this.cartItems = this.cartService.getItems(); // Refresh cart items when opened
    }
  }

  // Update quantity to ensure it is at least 1
  updateQuantity(item: CartItem): void {
    if (item.quantity < 1) {
      item.quantity = 1;
    }
  }

  // Calculate total cost
  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Generate bill as PDF
  generateBill(): void {
    const doc = new jsPDF();
    doc.text('Bill Summary', 20, 20);

    this.cartItems.forEach((item, index) => {
      doc.text(`${item.name}: ${item.quantity} x ${item.price} = ${item.quantity * item.price}`, 20, 30 + (10 * index));
    });

    doc.text(`Total: ${this.getTotal()}`, 20, 30 + (10 * this.cartItems.length));
    doc.save('bill.pdf');
  }

  // Remove item from cart
  removeItem(itemToRemove: CartItem): void {
    this.cartItems = this.cartItems.filter(item => item !== itemToRemove);
    console.log(`${itemToRemove.name} has been removed from the cart.`);
  }
}
