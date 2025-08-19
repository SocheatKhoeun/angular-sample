import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-product',
  imports: [CommonModule],
  template: `
    <div class="product-list">
      <h2 class="title">Products</h2>
      <div class="products">
        <div class="product-card" *ngFor="let product of productService.products()">
          <img [src]="product.imageUrl" alt="{{product.name}}" />
          <h3>{{product.name}}</h3>
          <p>\${{ product.price | number:'1.2-2' }}</p>
          <div class="actions">
            <button class="details-btn" (click)="viewDetails(product.id)">Details</button>
            <button class="add-btn" (click)="addToCart(product)">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-list {
      max-width: 1200px;
      margin: 50px auto;
      padding: 0 20px;
      text-align: center;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .title {
      font-size: 2rem;
      margin-bottom: 30px;
      color: #333;
    }

    .products {
      display: flex;
      flex-wrap: wrap;
      gap: 25px;
      justify-content: center;
    }

    .product-card {
      width: 220px;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 20px rgba(0,0,0,0.12);
    }

    .product-card img {
      width: 140px;
      height: 140px;
      object-fit: cover;
      border-radius: 12px;
      margin-bottom: 12px;
    }

    .product-card h3 {
      font-size: 1.1rem;
      margin: 10px 0 5px;
      color: #222;
    }

    .product-card p {
      font-size: 1rem;
      margin: 0 0 15px;
      font-weight: 600;
      color: #555;
    }

    .actions {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
    }

    .actions button {
      width: 100%;
      padding: 8px 0;
      border-radius: 20px;
      border: none;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    }

    .details-btn {
      background-color: #48bb78;
      color: #fff;
    }
    .details-btn:hover {
      background-color: #38a169;
    }

    .add-btn {
      background-color: #667eea;
      color: #fff;
    }
    .add-btn:hover {
      background-color: #5a67d8;
    }

    @media (max-width: 600px) {
      .product-card {
        width: 45%;
      }
    }

    @media (max-width: 400px) {
      .product-card {
        width: 100%;
      }
    }
  `]
})
export class ProductComponent implements OnInit {
  constructor(public productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.productService.fetchProducts();
  }

  addToCart(product: any) {
    this.productService.addToCart(product);
  }

  viewDetails(id: number) {
    this.router.navigate(['/products', id]);
  }
}
