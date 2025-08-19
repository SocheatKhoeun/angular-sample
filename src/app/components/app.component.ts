import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterModule],
  template: `
    <header>
      <nav class="main-nav">
        <div class="logo">
          <a routerLink="/">Store</a>
        </div>

        <div class="nav-links">
          <a routerLink="/products" routerLinkActive="active">Products</a>
          <a routerLink="/cart" routerLinkActive="active">Cart</a>
          <a routerLink="/checkout" routerLinkActive="active">Checkout</a>
        </div>

        <div class="cta">
          <input type="text" placeholder="Search products..." class="search-box" />
          <button class="search-btn">Search</button>
        </div>
      </nav>
    </header>

    <router-outlet></router-outlet>
  `,
  styles: [`
    header {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: #fff;
    }

    .main-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 30px;
      max-width: 1200px;
      margin: 0 auto;
      flex-wrap: wrap;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .logo a {
      font-size: 1.8rem;
      font-weight: 700;
      text-decoration: none;
      color: #667eea;
      transition: color 0.3s;
    }
    .logo a:hover {
      color: #5a67d8;
    }

    .nav-links {
      display: flex;
      gap: 25px;
      flex-wrap: wrap;
    }

    .nav-links a {
      text-decoration: none;
      color: #333;
      font-weight: 500;
      position: relative;
      transition: color 0.3s, transform 0.2s;
    }
    .nav-links a:hover {
      color: #667eea;
      transform: translateY(-2px);
    }
    .nav-links a.active::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 2px;
      background: #667eea;
      border-radius: 1px;
    }

    /* Search Box */
    .cta {
      display: flex;
      gap: 8px;
      align-items: center;
      margin-top: 5px;
    }
    .search-box {
      padding: 6px 14px;
      border-radius: 25px;
      border: 1px solid #ccc;
      outline: none;
      width: 200px;
      transition: all 0.3s;
    }
    .search-box:focus {
      border-color: #667eea;
      box-shadow: 0 0 5px rgba(102, 126, 234, 0.5);
    }
    .search-btn {
      padding: 6px 18px;
      background: #667eea;
      color: #fff;
      border: none;
      border-radius: 25px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s ease;
    }
    .search-btn:hover {
      background: #764ba2;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .main-nav {
        flex-direction: column;
        gap: 12px;
      }
      .nav-links {
        flex-direction: column;
        gap: 12px;
      }
      .cta {
        width: 100%;
        justify-content: center;
      }
      .search-box {
        width: 60%;
      }
    }
  `]
})
export class AppComponent {}
