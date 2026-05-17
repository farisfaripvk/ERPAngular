import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomerService } from '../../services/customer';
import { Customer } from '../../models/CustomerModel';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="customer-container">
      <div class="header-section">
        <h1>Customer Management</h1>
        <button class="add-btn" routerLink="/customers/add">+ Add Customer</button>
      </div>
      <div class="customer-table-wrapper">
        <table class="customer-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Code</th>
              <th>Address</th>
              <th>Area Code</th>
              <th>Category Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let cust of customers">
              <td>{{ cust.id }}</td>
              <td>{{ cust.name }}</td>
              <td>{{ cust.code }}</td>
              <td>{{ cust.address }}</td>
              <td>{{ cust.areaCode }}</td>
              <td>{{ cust.categoryCode }}</td>
              <td>
                <button class="edit-btn" [routerLink]="['/customers/edit', cust.id]">Edit</button>
                <button class="delete-btn" (click)="deleteCustomer(cust.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [
    `
      .customer-container {
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
        border-bottom: 2px solid #ecf0f1;
        padding-bottom: 1rem;
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
      }
      .customer-table-wrapper {
        overflow-x: auto;
      }
      .customer-table {
        width: 100%;
        border-collapse: collapse;
      }
      .customer-table th,
      .customer-table td {
        padding: 0.75rem;
        text-align: left;
        border-bottom: 1px solid #ecf0f1;
      }
      .customer-table th {
        background: #f8f9fa;
        font-weight: 600;
      }
      .edit-btn {
        background: #3498db;
        color: white;
        border: none;
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        margin-right: 0.5rem;
        cursor: pointer;
      }
      .delete-btn {
        background: #e74c3c;
        color: white;
        border: none;
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        cursor: pointer;
      }
    `,
  ],
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];

  constructor(private customerService: CustomerService) {}

  async ngOnInit() {
    await this.loadCustomers();
  }

  async loadCustomers() {
    this.customers = await this.customerService.getCustomers();
  }

  async deleteCustomer(id: number) {
    if (confirm('Are you sure?')) {
      await this.customerService.deleteCustomer(id);
      await this.loadCustomers();
    }
  }
}
