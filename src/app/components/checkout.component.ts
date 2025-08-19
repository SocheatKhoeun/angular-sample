import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ProductService } from '../services/product.service';

@Component({
  standalone: true,
  selector: 'app-checkout',
  imports: [CommonModule, DecimalPipe],
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
                <img [src]="item.product.imageUrl" alt="{{item.product.name}}" />
                <span>{{ item.product.name }}</span>
              </td>
              <td>{{ item.quantity }}</td>
              <td>\${{ item.product.price | number:'1.2-2' }}</td>
              <td>\${{ (item.product.price * item.quantity) | number:'1.2-2' }}</td>
            </tr>
          </tbody>
        </table>

        <div class="summary">
          <span class="total">Total: \${{ total() | number:'1.2-2' }}</span>
          <button class="btn complete-btn" (click)="completeCheckout()">Complete Order</button>
        </div>
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
  `]
})
export class CheckoutComponent {
  constructor(public productService: ProductService, private router: Router) {}

  total() {
    return this.productService.cart().reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  completeCheckout() {
    this.productService.clearCart();
    alert('Order completed!');
    this.router.navigate(['/']);
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }
}
