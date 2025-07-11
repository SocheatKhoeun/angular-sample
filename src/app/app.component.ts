import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  image: string;
  disabled?: boolean;
}

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Product Gallery</h1>
      <div class="product-grid">
        <div 
          *ngFor="let product of products; let i = index" 
          class="product-item"
          [class.disabled]="product.disabled"
          [class.enlarged]="enlargedItems.has(i)"
          [style.display]="product.disabled ? 'none' : 'block'"
          [style.width.px]="productSize"
          [style.height.px]="productSize + 80"
        >
          <div class="product-image" [style.height.px]="productSize">
            <img [src]="product.image" [alt]="product.name" [style.height.px]="productSize" [style.width.px]="productSize">
          </div>
          <div class="product-name">{{ product.name }}</div>
        </div>
      </div>
      <div class="controls">
        <button class="control-btn" (click)="randomizeImage()" [disabled]="isProcessing">
          Random Image
        </button>
        <button class="control-btn" (click)="toggleDisable()" [disabled]="isProcessing">
          {{ hasDisabled ? 'Disable' : 'Enable' }}
        </button>
        <button class="control-btn" (click)="addSize()" [disabled]="isProcessing">
          Add Size
        </button>
        <button class="control-btn" (click)="removeSize()" [disabled]="isProcessing">
          Remove Size
        </button>
        <button class="control-btn" (click)="toggleImage()" [disabled]="isProcessing">
          Toggle Image
        </button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      min-height: 100vh;
      padding: 40px 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    h1 {
      text-align: center;
      margin-bottom: 32px;
      font-size: 2.5rem;
      font-weight: 600;
      color: #333;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr); /* Always 4 columns */
      gap: 16px;
      max-width: 1200px;
      margin: 0 auto 40px;
      padding: 0 8px;
    }

    .product-item {
      background: white;
      border-radius: 20px;
      padding: 12px; /* Reduced padding */
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .product-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }

    .product-item.disabled {
      opacity: 0.5;
      filter: grayscale(100%);
    }

    .product-item.enlarged {
      transform: scale(1.1);
      z-index: 10;
    }

    .product-image {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 15px;
      overflow: hidden;
      background: linear-gradient(45deg, #f8f9fa, #e9ecef);
      margin-bottom: 12px;
    }

    .product-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
      border-radius: 12px;
    }

    .product-item:hover .product-image img {
      transform: scale(1.05);
    }

    .product-name {
      font-size: 1.1rem;
      font-weight: 500;
      color: #444;
      margin-top: 8px;
      text-align: center;
    }

    .controls {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 15px;
      max-width: 600px;
      margin: 0 auto;
    }

    .control-btn {
      background: white;
      border: 2px solid #e9ecef;
      padding: 12px 24px;
      border-radius: 25px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      color: #495057;
      min-width: 120px;
    }

    .control-btn:hover:not(:disabled) {
      background: #007bff;
      color: white;
      border-color: #007bff;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
    }

    .control-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .control-btn:active:not(:disabled) {
      transform: translateY(0);
    }

    @media (max-width: 768px) {
      .product-grid {
        grid-template-columns: repeat(2, 1fr); /* 2 columns on mobile */
        gap: 10px;
        padding: 0 4px;
      }
      .controls {
        flex-direction: column;
        align-items: center;
      }
      .control-btn {
        width: 200px;
      }
    }
  `]
})
export class AppComponent {
  isProcessing = false;
  hasDisabled = false;
  enlargedItems = new Set<number>();
  productSize = 250;

  products: Product[] = [
    // { id: 1, name: 'Beer', image: '/assets/images/beer.jpeg' },
    // { id: 2, name: 'Coca Cola', image: '/assets/images/coca.jpeg' },
    { id: 3, name: 'Wine', image: '/assets/images/wine.jpeg' },
    { id: 4, name: 'Zero Coke', image: '/assets/images/zero.jpeg' },
    { id: 5, name: 'Face Mask', image: '/assets/images/cock.jpeg' },
    { id: 6, name: 'Moisturizer', image: '/assets/images/img-1.jpeg' },
    { id: 7, name: 'Zero Coke', image: '/assets/images/img-2.jpeg' },
    { id: 8, name: 'Face Mask', image: '/assets/images/img-3.jpeg' },
    { id: 9, name: 'Moisturizer', image: '/assets/images/img-4.jpeg' },
    { id: 10, name: 'Moisturizer', image: '/assets/images/img-5.jpeg' }
  ];

  randomizeImage() {
    this.isProcessing = true;
    setTimeout(() => {
      // Only shuffle product positions (no image changes)
      this.products = this.shuffleArray(this.products);
      this.isProcessing = false;
    }, 300);
  }

  private shuffleArray<T>(array: T[]): T[] {
    // Fisher-Yates shuffle, preserves all items, no duplicates
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  toggleDisable() {
    this.isProcessing = true;
    setTimeout(() => {
      if (this.hasDisabled) {
        this.products.forEach(product => product.disabled = false);
        this.hasDisabled = false;
      } else {
        const itemsToDisable = Math.floor(Math.random() * this.products.length) + 1;
        const indices = new Set<number>();
        while (indices.size < itemsToDisable) {
          indices.add(Math.floor(Math.random() * this.products.length));
        }
        this.products.forEach(product => product.disabled = false);
        indices.forEach(index => {
          this.products[index].disabled = true;
        });
        this.hasDisabled = true;
      }
      this.isProcessing = false;
    }, 300);
  }

  addSize() {
    this.isProcessing = true;
    setTimeout(() => {
      this.productSize = Math.min(this.productSize + 40, 500);
      this.isProcessing = false;
    }, 300);
  }

  removeSize() {
    this.isProcessing = true;
    setTimeout(() => {
      this.productSize = Math.max(this.productSize - 40, 100);
      this.isProcessing = false;
    }, 300);
  }

  toggleImage() {
    this.isProcessing = true;
    setTimeout(() => {
      const numToToggle = Math.floor(Math.random() * this.products.length) + 1;
      const indices = new Set<number>();
      while (indices.size < numToToggle) {
        indices.add(Math.floor(Math.random() * this.products.length));
      }
      indices.forEach(index => {
        this.products[index].disabled = !this.products[index].disabled;
      });
      this.hasDisabled = this.products.some(p => p.disabled);
      this.isProcessing = false;
    }, 300);
  }
}