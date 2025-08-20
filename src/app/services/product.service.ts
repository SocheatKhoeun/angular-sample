import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  products = signal<Product[]>([]);
  cart = signal<{ product: Product, quantity: number }[]>([]);

  constructor(private http: HttpClient) {}

  fetchProducts() {
    this.http.get<Product[]>('https://fakestoreapi.com/products').subscribe(data => {
      this.products.set(data);
    });
  }

  getProductById(id: number) {
    return this.products().find(p => p.id === id);
  }

  addToCart(product: Product) {
    const cartItems = this.cart();
    const idx = cartItems.findIndex(item => item.product.id === product.id);
    if (idx > -1) {
      cartItems[idx].quantity++;
    } else {
      cartItems.push({ product, quantity: 1 });
    }
    this.cart.set([...cartItems]);
  }

  removeFromCart(productId: number) {
    const cartItems = this.cart().map(item =>
      item.product.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    this.cart.set(cartItems.filter(item => item.quantity > 0));
  }

  deleteFromCart(productId: number) {
    this.cart.set(this.cart().filter(item => item.product.id !== productId));
  }

  clearCart() {
    this.cart.set([]);
  }
}

