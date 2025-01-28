import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductListComponent } from './admin/product-list/product-list.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login by default
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'cart', component: CartComponent },
  { path: 'profile', component: ProfileComponent },
  
  // Admin routes
  { path: 'admin/products', component: ProductListComponent },
  { path: 'admin/products/new', component: ProductFormComponent },
  { path: 'admin/products/edit/:id', component: ProductFormComponent },
  
  // Fallback route for undefined paths
  { path: '**', redirectTo: '/home' } // Redirect to login for any undefined routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
