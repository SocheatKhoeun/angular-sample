import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';

@Component({
  standalone: true,
  selector: 'app-product-details',
  imports: [CommonModule],
  template: `
    <div *ngIf="product" class="details-container">
      <img [src]="product.imageUrl" alt="{{product.name}}" />

      <div class="info">
        <h2>{{product.name}}</h2>
        <p class="price">Price: \${{product.price}}</p>
        <p class="stock">Stock: {{ product.qty }}</p>

        <div class="buttons">
          <button class="add-btn" (click)="addToCart()">Add to Cart</button>
          <button class="back-btn" (click)="goBack()">Back</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .details-container {
      display: flex;
      flex-wrap: wrap;
      gap: 40px;
      max-width: 800px;
      margin: 50px auto;
      align-items: flex-start;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      padding: 30px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .details-container img {
      width: 250px;
      height: 250px;
      object-fit: cover;
      border-radius: 16px;
      flex-shrink: 0;
    }

    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .info h2 {
      font-size: 1.8rem;
      margin-bottom: 15px;
      color: #222;
    }

    .info .price, .info .stock {
      font-size: 1.1rem;
      margin-bottom: 10px;
      color: #555;
    }

    .buttons {
      margin-top: 20px;
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
    }

    .buttons button {
      padding: 10px 24px;
      border-radius: 20px;
      border: none;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .add-btn {
      background-color: #48bb78;
      color: #fff;
    }
    .add-btn:hover {
      background-color: #38a169;
    }

    .back-btn {
      background-color: #667eea;
      color: #fff;
    }
    .back-btn:hover {
      background-color: #5a67d8;
    }

    @media (max-width: 600px) {
      .details-container {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .info {
        align-items: center;
      }

      .buttons {
        justify-content: center;
      }
    }
  `]
})
export class ProductDetailsComponent implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public productService: ProductService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.productService.products().length) {
      this.productService.fetchProducts();
    }
    this.product = this.productService.getProductById(id);
  }

  addToCart() {
    this.productService.addToCart(this.product);
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}
