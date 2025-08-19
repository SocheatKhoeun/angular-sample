import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { ProductComponent } from './components/product.component';
import { ProductDetailsComponent } from './components/product-details.component';
import { CartComponent } from './components/cart.component';
import { CheckoutComponent } from './components/checkout.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent }
];

