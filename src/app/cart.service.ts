import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: any[] = []; // Array to hold cart items

  // Method to add a product to the cart
  addToCart(product: any): void {
    this.items.push(product);
    console.log('Product added to cart:', product);
  }

  // Method to get the items in the cart
  getItems(): any[] {
    return this.items;
  }

  updateCartItems(updatedItems: any[]): void {
    this.items = updatedItems;
  }
}
