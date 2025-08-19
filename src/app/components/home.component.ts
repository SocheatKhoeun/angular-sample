import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-home',
  template: `
    <div class="home-container">
      <h1>Welcome to Product Gallery</h1>
      <p>Discover premium products with an exceptional shopping experience.</p>
      <a routerLink="/products" class="btn">Explore Products</a>
    </div>
  `,
  styles: [`
    .home-container {
      text-align: center;
      margin-top: 80px;
    }
    h1 {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 20px;
      background: linear-gradient(45deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    p {
      font-size: 1.2rem;
      margin-bottom: 40px;
      color: #444;
    }
    .btn {
      display: inline-block;
      margin-top: 30px;
      padding: 15px 40px;
      background: #667eea;
      color: white;
      border-radius: 50px;
      font-weight: 600;
      font-size: 1.1rem;
      text-decoration: none;
      border: none;
      transition: background 0.3s;
    }
    .btn:hover {
      background: #764ba2;
    }
  `]
})
export class HomeComponent {}