import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      { path: 'products/add', component: ProductFormComponent },
      { path: 'products/edit/:id', component: ProductFormComponent },
    ])
  ]
})
export class AdminModule { }
