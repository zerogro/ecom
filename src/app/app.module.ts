import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductsComponent } from './products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from './products.service';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminModule } from './admin/admin.module';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    ProductsComponent,
    SignupComponent,
    HeaderComponent,
    CartComponent,
    ProfileComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AdminModule
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
