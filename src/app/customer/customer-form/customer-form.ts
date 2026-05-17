import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CustomerService } from '../../services/customer';
import { Customer } from '../../models/CustomerModel';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="form-container">
      <h2>{{ isEditMode ? 'Edit Customer' : 'Add New Customer' }}</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label>Name *</label>
          <input type="text" [(ngModel)]="customer.name" name="name" required />
        </div>
        <div class="form-group">
          <label>Code *</label>
          <input type="text" [(ngModel)]="customer.code" name="code" required />
        </div>
        <div class="form-group">
          <label>Address</label>
          <input type="text" [(ngModel)]="customer.address" name="address" />
        </div>
        <div class="form-group">
          <label>Area Code</label>
          <input type="text" [(ngModel)]="customer.areaCode" name="areaCode" />
        </div>
        <div class="form-group">
          <label>Category Code</label>
          <input type="text" [(ngModel)]="customer.categoryCode" name="categoryCode" />
        </div>
        <div class="button-group">
          <button type="submit">Save</button>
          <button type="button" (click)="cancel()">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .form-container {
        max-width: 600px;
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
    `,
  ],
})
export class CustomerFormComponent implements OnInit {
  customer: Customer = { id: 0, name: '', code: '', address: '', areaCode: '', categoryCode: '' };
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      const cust = await this.customerService.getCustomer(+id);
      if (cust) this.customer = cust;
    }
  }

  async onSubmit() {
    if (this.isEditMode) {
      await this.customerService.updateCustomer(this.customer);
    } else {
      await this.customerService.createCustomer(this.customer);
    }
    this.router.navigate(['/customers']);
  }

  cancel() {
    this.router.navigate(['/customers']);
  }
}
