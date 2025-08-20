import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  standalone: true,
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="checkout-container">
      <h2 class="checkout-title">Checkout</h2>

      <div *ngIf="!productService.cart().length" class="empty-checkout">
        <p>🛒 Your cart is empty.</p>
        <button class="btn shop-btn" (click)="goToProducts()">Shop Now</button>
      </div>

      <div *ngIf="productService.cart().length">
        <table class="checkout-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of productService.cart()">
              <td class="product-cell">
                <img [src]="item.product.image" alt="{{item.product.title}}" />
                <span>{{ item.product.title }}</span>
              </td>
              <td>{{ item.quantity }}</td>
              <td>\${{ item.product.price | number:'1.2-2' }}</td>
              <td>\${{ (item.product.price * item.quantity) | number:'1.2-2' }}</td>
            </tr>
          </tbody>
        </table>

        <div class="summary" *ngIf="!showForm">
          <span class="total">Total: \${{ total() | number:'1.2-2' }}</span>
          <button class="btn complete-btn" (click)="showForm = true">Complete Order</button>
        </div>

        <!-- Checkout Form -->
        <form *ngIf="showForm" class="checkout-form" (ngSubmit)="placeOrder()">
          <h3>Enter your information</h3>
          <div class="form-group">
            <label>Name</label>
            <input type="text" [(ngModel)]="customer.name" name="name" required class="form-input" />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" [(ngModel)]="customer.email" name="email" required class="form-input" />
          </div>
          <div class="form-group">
            <label>Address</label>
            <input type="text" [(ngModel)]="customer.address" name="address" required class="form-input" />
          </div>
          <div class="form-actions">
            <button type="submit" class="btn complete-btn" [disabled]="!customer.name || !customer.email || !customer.address">
              Place Order
            </button>
            <button type="button" class="btn cancel-btn" (click)="showForm = false">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .checkout-container {
      max-width: 800px;
      margin: 50px auto;
      padding: 30px;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .checkout-title {
      text-align: center;
      font-size: 1.8rem;
      margin-bottom: 20px;
      color: #333;
    }

    .empty-checkout {
      text-align: center;
      color: #666;
      font-size: 1.1rem;
      padding: 30px 0;
    }

    .shop-btn {
      background-color: #667eea;
      color: #fff;
      margin-top: 15px;
      padding: 10px 24px;
      border-radius: 20px;
      font-size: 1rem;
    }
    .shop-btn:hover {
      background-color: #5a67d8;
    }

    .checkout-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0 10px;
      margin-top: 20px;
    }

    .checkout-table th {
      text-align: left;
      padding: 12px;
      background: #f5f5f5;
      font-weight: 600;
      border-bottom: 2px solid #ddd;
      color: #333;
    }

    .checkout-table td {
      padding: 12px;
      vertical-align: middle;
      background: #fafafa;
      border-radius: 12px;
    }

    .product-cell {
      display: flex;
      align-items: center;
    }

    .product-cell img {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 8px;
      margin-right: 12px;
    }

    .summary {
      margin-top: 25px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 15px;
      border-top: 1px solid #eee;
    }

    .total {
      font-size: 1.3rem;
      font-weight: 600;
      color: #222;
    }

    .complete-btn {
      background-color: #48bb78;
      color: #fff;
      padding: 10px 24px;
      border-radius: 20px;
      font-size: 1rem;
      font-weight: 500;
      transition: all 0.2s ease;
    }
    .complete-btn:hover {
      background-color: #38a169;
    }

    .checkout-form {
      margin-top: 30px;
      padding: 24px;
      background: #f8fafc;
      border-radius: 16px;
      box-shadow: 0 2px 8px rgba(102,126,234,0.07);
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
    }
    .checkout-form h3 {
      margin-bottom: 18px;
      font-size: 1.3rem;
      color: #333;
      text-align: center;
    }
    .form-group {
      margin-bottom: 18px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    .form-group label {
      font-weight: 500;
      margin-bottom: 6px;
      color: #555;
    }
    .form-input {
      width: 100%;
      padding: 10px 14px;
      border-radius: 8px;
      border: 1px solid #cbd5e1;
      font-size: 1rem;
      background: #fff;
      transition: border 0.2s;
    }
    .form-input:focus {
      border-color: #667eea;
      outline: none;
    }
    .form-actions {
      display: flex;
      gap: 12px;
      justify-content: center;
      margin-top: 10px;
    }
    .cancel-btn {
      background-color: #f56565;
      color: #fff;
    }
    .cancel-btn:hover {
      background-color: #c53030;
    }
  `]
})
export class CheckoutComponent {
  showForm = false;
  customer = { name: '', email: '', address: '' };

  constructor(public productService: ProductService, private router: Router) {}

  total() {
    return this.productService.cart().reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  placeOrder() {
    if (this.customer.name && this.customer.email && this.customer.address) {
      this.productService.clearCart();
      alert(
        `Order placed successfully!\n\nName: ${this.customer.name}\nEmail: ${this.customer.email}\nAddress: ${this.customer.address}`
      );
      this.showForm = false;
      this.router.navigate(['/']);
    }
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }
}
