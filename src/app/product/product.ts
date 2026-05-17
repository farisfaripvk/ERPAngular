// src/app/product/product.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="product-container">
      <!-- new code---BEGIN-->
      <div class="header-section">
        <h1>Product Management</h1>
        <button class="add-btn" routerLink="/products/add">+ Add Product</button>
      </div>
      <!-- new code---END-->

      <div class="product-grid">
        <div *ngFor="let product of products" class="product-card">
          <div class="product-icon">📦</div>
          <h3>{{ product.name }}</h3>
          <p class="product-price">\${{ product.price }}</p>
          <p class="product-category">{{ product.category }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .product-container {
        background: white;
        border-radius: 10px;
        padding: 1.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
      .header-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid #ecf0f1;
      }
      h1 {
        margin: 0;
        color: #2c3e50;
      }
      .add-btn {
        background: #27ae60;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.3s;
      }
      .add-btn:hover {
        background: #219a52;
      }
      .product-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1.5rem;
      }
      .product-card {
        background: #f8f9fa;
        border-radius: 8px;
        padding: 1.5rem;
        text-align: center;
        transition:
          transform 0.3s,
          box-shadow 0.3s;
      }
      .product-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }
      .product-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
      }
      h3 {
        margin: 0 0 0.5rem 0;
        color: #2c3e50;
      }
      .product-price {
        font-size: 1.25rem;
        font-weight: bold;
        color: #27ae60;
        margin: 0.5rem 0;
      }
      .product-category {
        color: #7f8c8d;
        margin: 0;
      }
    `,
  ],
})
export class ProductComponent {
  products = [
    { id: 1, name: 'Laptop Pro', price: 1299, category: 'Electronics' },
    { id: 2, name: 'Wireless Mouse', price: 29, category: 'Accessories' },
    { id: 3, name: 'Mechanical Keyboard', price: 89, category: 'Accessories' },
    { id: 4, name: '4K Monitor', price: 499, category: 'Electronics' },
    { id: 5, name: 'USB-C Hub', price: 45, category: 'Accessories' },
  ];
}
