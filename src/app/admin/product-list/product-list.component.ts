import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Product } from 'src/app/admin/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.adminService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  deleteProduct(id: string | undefined): void {
    if (id) {
      this.adminService.deleteProduct(id).subscribe(() => {
        this.loadProducts(); // Reload products after deletion
      });
    } else {
      console.error('Product ID is undefined. Cannot delete product.');
    }
  }
}
