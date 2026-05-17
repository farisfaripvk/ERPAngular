import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InvoiceService } from '../../services/invoice';
import { CustomerService } from '../../services/customer';
import { ProductService } from '../../services/product';
import { SalesInvoice } from '../../models/sales-invoicemodel';
import { InvoiceItem } from '../../models/invoice-itemmodel';
import { Customer } from '../../models/CustomerModel';
import { Product } from '../../models/product.models';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-container">
      <h2>Create New Invoice</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-row">
          <div class="form-group">
            <label>Invoice No *</label>
            <input type="text" [(ngModel)]="invoice.invoiceNo" name="invoiceNo" required />
          </div>
          <div class="form-group">
            <label>Date *</label>
            <input type="date" [(ngModel)]="invoice.date" name="date" required />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Customer Code *</label>
            <select [(ngModel)]="invoice.customerCode" name="customerCode" required>
              <option value="">-- Select Customer --</option>
              <option *ngFor="let cust of customers" [value]="cust.code">
                {{ cust.name }} ({{ cust.code }})
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Address</label>
            <input type="text" [(ngModel)]="invoice.address" name="address" />
          </div>
        </div>

        <div class="items-section">
          <h3>Invoice Items</h3>
          <div class="item-grid">
            <div class="item-header">
              <span>Product</span><span>Quantity</span><span>Rate</span><span>Amount</span
              ><span></span>
            </div>
            <div *ngFor="let item of invoice.items; let i = index" class="item-row">
              <select
                [(ngModel)]="item.productId"
                [ngModelOptions]="{ standalone: true }"
                (change)="updateItemAmount(i)"
              >
                <option value="">-- Select Product --</option>
                <option *ngFor="let prod of products" [value]="prod.id">
                  {{ prod.name }} ({{ prod.price | currency }})
                </option>
              </select>
              <input
                type="number"
                step="0.01"
                [(ngModel)]="item.quantity"
                [ngModelOptions]="{ standalone: true }"
                (input)="updateItemAmount(i)"
              />
              <input
                type="number"
                step="0.01"
                [(ngModel)]="item.rate"
                [ngModelOptions]="{ standalone: true }"
                (input)="updateItemAmount(i)"
              />
              <span>{{ item.amount | currency }}</span>
              <button type="button" (click)="removeItem(i)">❌</button>
            </div>
          </div>
          <button type="button" (click)="addItem()" class="add-item-btn">+ Add Product</button>
        </div>

        <div class="footer">
          <strong>Total: {{ invoice.total | currency }}</strong>
        </div>
        <div class="button-group">
          <button type="submit" [disabled]="!isFormValid()">Save Invoice</button>
          <button type="button" (click)="cancel()">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .form-container {
        max-width: 900px;
        margin: 2rem auto;
        background: white;
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
      h2,
      h3 {
        color: #2c3e50;
      }
      .form-row {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
      }
      .form-group {
        flex: 1;
      }
      label {
        display: block;
        font-weight: 500;
        margin-bottom: 0.3rem;
      }
      input,
      select {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
      .items-section {
        margin: 1.5rem 0;
        border-top: 1px solid #ecf0f1;
        padding-top: 1rem;
      }
      .item-header,
      .item-row {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr 0.5fr;
        gap: 0.5rem;
        align-items: center;
        margin-bottom: 0.5rem;
      }
      .item-header {
        font-weight: bold;
      }
      .footer {
        text-align: right;
        margin: 1rem 0;
        font-size: 1.2rem;
      }
      .add-item-btn {
        background: #3498db;
        color: white;
        border: none;
        padding: 0.4rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 0.5rem;
      }
      .button-group {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
        justify-content: flex-end;
      }
      button[type='submit'] {
        background: #27ae60;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
      }
      button[type='button'] {
        background: #95a5a6;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
      }
    `,
  ],
})
export class InvoiceFormComponent implements OnInit {
  invoice: SalesInvoice = {
    invoiceNo: '',
    date: new Date().toISOString().slice(0, 10),
    customerCode: '',
    address: '',
    total: 0,
    items: [],
  };
  customers: Customer[] = [];
  products: Product[] = [];

  constructor(
    private invoiceService: InvoiceService,
    private customerService: CustomerService,
    private productService: ProductService,
    private router: Router,
  ) {}

  async ngOnInit() {
    await Promise.all([this.loadCustomers(), this.loadProducts()]);
    this.addItem(); // start with one empty line item
  }

  async loadCustomers() {
    this.customers = await this.customerService.getCustomers();
  }

  async loadProducts() {
    this.products = await this.productService.getProducts();
  }

  addItem() {
    this.invoice.items.push({ productId: 0, quantity: 1, rate: 0, amount: 0 });
  }

  removeItem(index: number) {
    this.invoice.items.splice(index, 1);
    this.calculateTotal();
  }

  updateItemAmount(index: number) {
    const item = this.invoice.items[index];
    // Auto-fill rate if product selected and rate is zero (optional)
    if (item.productId && item.rate === 0) {
      const selectedProduct = this.products.find((p) => p.id === item.productId);
      if (selectedProduct) item.rate = selectedProduct.price;
    }
    item.amount = item.quantity * item.rate;
    this.calculateTotal();
  }

  calculateTotal() {
    this.invoice.total = this.invoice.items.reduce((sum, i) => sum + i.amount, 0);
  }

  isFormValid(): boolean {
    return (
      this.invoice.invoiceNo.trim() !== '' &&
      this.invoice.date !== '' &&
      this.invoice.customerCode !== '' &&
      this.invoice.items.length > 0 &&
      this.invoice.items.every((i) => i.productId > 0 && i.quantity > 0 && i.rate >= 0)
    );
  }

  async onSubmit() {
    try {
      await this.invoiceService.createInvoice(this.invoice);
      alert('Invoice saved successfully!');
      this.router.navigate(['/invoices']);
    } catch (err) {
      console.error(err);
      alert('Failed to save invoice. Check console.');
    }
  }

  cancel() {
    this.router.navigate(['/invoices']);
  }
}
