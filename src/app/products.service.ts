import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './admin/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService{
  private baseUrl = 'http://localhost:8080/api/products'; 

  constructor(private http: HttpClient) {}

  // Get all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  // Get products by category
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/category/${category}`);
  }

  searchProducts(name: string): Observable<any[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/search?name=${name}`);
  }
   
}
