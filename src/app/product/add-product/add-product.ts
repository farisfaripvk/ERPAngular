import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product.models';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="add-product-container">
      <h2>Add New Product</h2>
      <form (ngSubmit)="onSubmit()" #productForm="ngForm">
        <div class="form-group">
          <label>Name *</label>
          <input type="text" [(ngModel)]="product.name" name="name" required />
        </div>
        <div class="form-group">
          <label>Price *</label>
          <input type="number" step="0.01" [(ngModel)]="product.price" name="price" required />
        </div>
        <div class="form-group">
          <label>Category Code</label>
          <input type="number" [(ngModel)]="product.iCategoryCode" name="category" />
        </div>
        <div class="form-group">
          <label>Brand Code</label>
          <input type="text" [(ngModel)]="product.brandCode" name="brand" />
        </div>
        <div class="form-group">
          <label>Image Path (URL)</label>
          <input type="text" [(ngModel)]="product.imagePath" name="imagePath" />
        </div>
        <div class="form-group">
          <label>Sales Rate</label>
          <input type="number" step="0.01" [(ngModel)]="product.salesRate" name="salesRate" />
        </div>
        <div class="button-group">
          <button type="submit" [disabled]="productForm.invalid">Save Product</button>
          <button type="button" (click)="cancel()">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .add-product-container {
        max-width: 500px;
        margin: 2rem auto;
        background: white;
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
      h2 {
        margin-bottom: 1.5rem;
        color: #2c3e50;
      }
      .form-group {
        margin-bottom: 1rem;
      }
      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
      }
      input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
      .button-group {
        display: flex;
        gap: 1rem;
        margin-top: 1.5rem;
      }
      button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      button[type='submit'] {
        background: #27ae60;
        color: white;
      }
      button[type='button'] {
        background: #95a5a6;
        color: white;
      }
      button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `,
  ],
})
export class AddProductComponent {
  product: Product = {
    id: 0,
    name: '',
    price: 0,
    iCategoryCode: 0,
    brandCode: '',
    imagePath: '',
    salesRate: 0,
  };

  constructor(
    private productService: ProductService,
    private router: Router,
  ) {}

  async onSubmit(): Promise<void> {
    try {
      await this.productService.createProduct(this.product);
      alert('Product saved successfully!');
      this.router.navigate(['/products']); // back to product list
    } catch (error) {
      console.error(error);
      alert('Failed to save product');
    }
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
