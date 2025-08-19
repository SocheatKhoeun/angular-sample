import { Injectable, signal } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
  qty: number;
  imageUrl: string;
}

const STATIC_PRODUCTS: Product[] = [
  { id: 1, name: "Coca-Cola", price: 0.6, qty: 90, imageUrl: "https://i5.walmartimages.com/seo/Coca-Cola-Soda-Pop-20-fl-oz-Bottle_3c8c89c7-9455-41f5-a088-e3fd0f262808.e4f3fd564848ff4ce9367227da65e5a9.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF" },
  { id: 2, name: "Pepsi", price: 0.55, qty: 80, imageUrl: "https://i5.walmartimages.com/seo/Pepsi-Cola-Soda-Pop-12-fl-oz-12-Pack-Cans_5fadfcb4-e2c7-4373-bc4c-bb776b68486e.09177c6d1e451cd29d0291f7545295b1.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF" },
  { id: 3, name: "Sprite", price: 0.5, qty: 100, imageUrl: "https://i5.walmartimages.com/seo/Sprite-Lemon-Lime-Soda-Pop-12-fl-oz-24-Pack-Cans_32aaefdb-521b-4035-9163-6720f0272dad.b17165a8b7311c64ffe0de4831004b49.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF" },
  { id: 4, name: "Fanta", price: 0.65, qty: 75, imageUrl: "https://i5.walmartimages.com/seo/Fanta-Strawberry-Fruit-Soda-Pop-12-fl-oz-12-Pack-Cans_eeeb7dee-00c1-45cc-9dce-457384651027.dfb9673974aa72d287bd62f2d577913f.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF" },
  { id: 5, name: "Mountain Dew", price: 0.7, qty: 60, imageUrl: "https://i5.walmartimages.com/seo/Mountain-Dew-Original-Soda-12-fl-oz-12-Count_94a08299-17d7-4dc1-800e-7c9fd0b245d1.3d02ba398f6e18232d8d9e84517aa847.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF" },
  { id: 6, name: "Lipton Ice Tea", price: 1.0, qty: 50, imageUrl: "https://i5.walmartimages.com/seo/Lipton-Brisk-Lemon-Iced-Tea-12-fl-oz-12-Pack-Cans_570f0d7e-4565-4c65-adcc-578b256d91f5.3166daf3ca8e5c00c0c9e940a3acb9cf.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF" },
  { id: 7, name: "Red Bull", price: 1.5, qty: 40, imageUrl: "https://i5.walmartimages.com/seo/Red-Bull-Energy-Drink-80mg-Caffeine-8-4-fl-oz-Pack-of-12-Cans_6d8d9bcf-fc1f-444f-ada7-016820e03052.4434333d685c8f7d6d1cb222dead532e.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF" },
  { id: 8, name: "Nestle Water", price: 0.4, qty: 120, imageUrl: "https://i5.walmartimages.com/seo/Pure-Life-Purified-Water-16-9-Fl-Oz-Plastic-Bottled-Water-12-Pack_8fb53976-d593-4040-b9b1-849a85f6cab8.b7b16a75bc72cc2f3d95c077e9a4e232.png?odnHeight=573&odnWidth=573&odnBg=FFFFFF" },
  { id: 9, name: "Gatorade", price: 1.2, qty: 70, imageUrl: "https://i5.walmartimages.com/seo/Gatorade-Thirst-Quencher-Sports-Drink-Variety-Pack-12-fl-oz-18-Bottles_ce42d01e-6704-486c-a6f9-56199ffb0296.6701d39ed898782ae0d2d1d026b451d9.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF" },
  { id: 10, name: "Peach Juice", price: 1.0, qty: 65, imageUrl: "https://i5.walmartimages.com/seo/Minute-Maid-Premium-Peach-Fruit-Juice-Drink-59-fl-oz-Carton_1835c42b-bb80-4c14-87a3-a139c8e92392.498fa366e81585abd1a9ef0401e15b29.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF" }
];

@Injectable({ providedIn: 'root' })
export class ProductService {
  products = signal<Product[]>([]);
  cart = signal<{ product: Product, quantity: number }[]>([]);

  fetchProducts() {
    this.products.set([...STATIC_PRODUCTS]);
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
