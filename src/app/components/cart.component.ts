import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ProductService } from '../services/product.service';

@Component({
  standalone: true,
  selector: 'app-cart',
  imports: [CommonModule, DecimalPipe],
  template: `
    <div class="cart-container">
      <h2 class="cart-title">Your Shopping Cart</h2>

      <div *ngIf="!productService.cart().length" class="empty-cart">
        🛒 Your cart is empty.
      </div>

      <table *ngIf="productService.cart().length" class="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of productService.cart()">
            <td class="product-cell">
              <img [src]="item.product.imageUrl" alt="{{item.product.name}}" />
              <span>{{item.product.name}}</span>
            </td>
            <td>{{ item.quantity }}</td>
            <td>\${{ item.product.price | number:'1.2-2' }}</td>
            <td>\${{ (item.product.price * item.quantity) | number:'1.2-2' }}</td>
            <td class="actions">
              <button class="btn add-btn" (click)="add(item.product)">+</button>
              <button class="btn remove-btn" (click)="remove(item.product.id)">-</button>
              <button class="btn delete-btn" (click)="delete(item.product.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="cart-summary" *ngIf="productService.cart().length">
        <span class="total">Total: \${{ total() | number:'1.2-2' }}</span>
        <button class="btn checkout-btn" (click)="checkout()">Checkout</button>
      </div>
    </div>
  `,
  styles: [`
    .cart-container {
      max-width: 900px;
      margin: 50px auto;
      padding: 30px;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .cart-title {
      font-size: 1.8rem;
      margin-bottom: 20px;
      color: #333;
      text-align: center;
    }

    .empty-cart {
      text-align: center;
      color: #666;
      font-size: 1.1rem;
      padding: 20px 0;
    }

    .cart-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0 10px;
      margin-top: 20px;
    }

    .cart-table th {
      text-align: left;
      padding: 12px;
      background: #f5f5f5;
      color: #333;
      font-weight: 600;
      border-bottom: 2px solid #ddd;
    }

    .cart-table td {
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

    .actions .btn {
      margin: 0 4px;
      padding: 6px 14px;
      border-radius: 12px;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
      font-weight: 500;
    }

    .add-btn { background-color: #48bb78; color: #fff; }
    .add-btn:hover { background-color: #38a169; }

    .remove-btn { background-color: #f56565; color: #fff; }
    .remove-btn:hover { background-color: #c53030; }

    .delete-btn { background-color: #e53e3e; color: #fff; }
    .delete-btn:hover { background-color: #9b2c2c; }

    .cart-summary {
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

    .checkout-btn {
      background-color: #667eea;
      color: #fff;
      padding: 8px 20px;
      font-size: 1rem;
    }

    .checkout-btn:hover { background-color: #5a67d8; }
  `]
})
export class CartComponent {
  constructor(public productService: ProductService, private router: Router) {}

  add(product: any) {
    this.productService.addToCart(product);
  }

  remove(productId: number) {
    this.productService.removeFromCart(productId);
  }

  delete(productId: number) {
    this.productService.deleteFromCart(productId);
  }

  total() {
    return this.productService.cart().reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }
}
