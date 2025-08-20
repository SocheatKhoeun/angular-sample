import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-product',
  imports: [CommonModule],
  template: `
    <!-- HERO SECTION -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <h1>
          <span class="gradient-text">Discover Your Next Purchase</span>
        </h1>
        <p class="subtitle">
          Shop the latest trends, top brands, and exclusive deals at <strong>E-Shop</strong>.
        </p>
        <button class="cta-btn" (click)="scrollToProducts()">Shop Now</button>
        <div class="hero-features">
          <div>
            <span>🚚</span>
            <span>Free Shipping</span>
          </div>
          <div>
            <span>💳</span>
            <span>Secure Payment</span>
          </div>
          <div>
            <span>⭐</span>
            <span>Top Rated Products</span>
          </div>
        </div>
      </div>
    </section>

    <!-- PRODUCT GRID -->
    <section class="product-list" id="products">
      <h2 class="title">Products</h2>
      <div class="products">
        <div class="product-card" *ngFor="let product of productService.products()">
          <img [src]="product.image" alt="{{product.title}}" />
          <h3>{{product.title}}</h3>
          <p>\${{ product.price | number:'1.2-2' }}</p>
          <div class="actions">
            <button class="details-btn" (click)="viewDetails(product.id)">Details</button>
            <button class="add-btn" (click)="addToCart(product)">Add to Cart</button>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <p>&copy; 2025 E-Shop. All rights reserved.</p>
      <div class="footer-links">
        <a routerLink="/privacy">Privacy Policy</a>
        <a routerLink="/terms">Terms of Service</a>
        <a routerLink="/contact">Contact</a>
      </div>
    </footer>
  `,
  styles: [`
    /* HERO SECTION */
    .hero {
      position: relative;
      min-height: 70vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      background: linear-gradient(120deg, #f3f6fd 60%, #e9f7ef 100%);
      width: 100%;
    }
    .hero-bg {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: url('https://images.unsplash.com/photo-1515165562835-cf7747c2b6b7?auto=format&fit=crop&w=1200&q=80') center/cover no-repeat;
      opacity: 0.18;
      z-index: 1;
    }
    .hero-content {
      position: relative;
      z-index: 2;
      text-align: center;
      background: linear-gradient(120deg, #f3f6fd 80%, #e9f7ef 100%);
      max-width: 700px;
      width: 100%;
      margin: auto;
      
    }
    .gradient-text {
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 2.8rem;
      font-weight: 800;
      margin-bottom: 18px;
      display: inline-block;
    }
    .subtitle {
      font-size: 1.25rem;
      color: #444;
      margin-bottom: 32px;
      font-weight: 500;
    }
    .cta-btn {
      padding: 16px 48px;
      font-size: 1.2rem;
      border-radius: 32px;
      border: none;
      background: linear-gradient(90deg, #48bb78 0%, #667eea 100%);
      color: #fff;
      font-weight: 700;
      cursor: pointer;
      margin-bottom: 32px;
      transition: background 0.2s, transform 0.2s;
      box-shadow: 0 4px 16px rgba(102,126,234,0.10);
    }
    .cta-btn:hover {
      background: linear-gradient(90deg, #764ba2 0%, #48bb78 100%);
      transform: translateY(-2px) scale(1.04);
    }
    .hero-features {
      display: flex;
      justify-content: center;
      gap: 32px;
      margin-top: 12px;
      font-size: 1.1rem;
      color: #667eea;
      font-weight: 600;
    }
    .hero-features div {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #f3f6fd;
      border-radius: 16px;
      padding: 8px 18px;
      box-shadow: 0 2px 8px rgba(102,126,234,0.06);
    }

    /* PRODUCTS */
    .product-list {
      max-width: 1200px;
      margin: 50px auto;
      padding: 0 20px;
      text-align: center;
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
      box-shadow: 0 4px 15px rgba(102,126,234,0.08);
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: transform 0.2s, box-shadow 0.2s;
      border: 1px solid #e3e9f7;
    }
    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 20px rgba(102,126,234,0.15);
      border-color: #667eea;
    }
    .product-card img {
      width: 140px;
      height: 140px;
      object-fit: cover;
      border-radius: 12px;
      margin-bottom: 12px;
      background: #f3f6fd;
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
    .details-btn { background-color: #48bb78; color: #fff; }
    .details-btn:hover { background-color: #38a169; }
    .add-btn { background-color: #667eea; color: #fff; }
    .add-btn:hover { background-color: #764ba2; }

    /* FOOTER */
    .footer {
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      color: #fff;
      padding: 25px 50px;
      text-align: center;
    }
    .footer-links {
      margin-top: 10px;
    }
    .footer-links a {
      margin: 0 10px;
      color: #48bb78;
      text-decoration: none;
    }
    .footer-links a:hover {
      text-decoration: underline;
      color: #fff;
    }

    /* RESPONSIVE */
    @media (max-width: 768px) {
      .products { gap: 15px; }
    }
    @media (max-width: 600px) { .product-card { width: 45%; } }
    @media (max-width: 400px) { .product-card { width: 100%; } }
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

  scrollToProducts() {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  }
}
