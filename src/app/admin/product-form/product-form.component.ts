import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service';
import { Product } from 'src/app/admin/product.model';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: Product = { name: '', description: '', price: 0, category: '' };
  isEditing = false;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.adminService.getProduct(id).subscribe((data) => {
        this.product = data;
      });
    }
  }

  saveProduct(): void {
    if (this.isEditing) {
      this.adminService.updateProduct(this.product).subscribe(() => {
        this.router.navigate(['/admin/products']);
      });
    } else {
      this.adminService.createProduct(this.product).subscribe(() => {
        this.router.navigate(['/admin/products']);
      });
    }
  }
}

