// src/app/invoice/invoice.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="invoice-container">
      <div class="header-section">
        <h1>Invoice List</h1>
        <button class="create-btn">+ Create Invoice</button>
      </div>
      <div class="invoice-table-wrapper">
        <table class="invoice-table">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let invoice of invoices">
              <td>#{{ invoice.id }}</td>
              <td>{{ invoice.customer }}</td>
              <td>{{ invoice.date }}</td>
              <td>\${{ invoice.amount }}</td>
              <td>
                <span
                  class="status-badge"
                  [class.paid]="invoice.status === 'Paid'"
                  [class.pending]="invoice.status === 'Pending'"
                >
                  {{ invoice.status }}
                </span>
              </td>
              <td>
                <button class="view-btn">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [
    `
      .invoice-container {
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
      .create-btn {
        background: #3498db;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.3s;
      }
      .create-btn:hover {
        background: #2980b9;
      }
      .invoice-table-wrapper {
        overflow-x: auto;
      }
      .invoice-table {
        width: 100%;
        border-collapse: collapse;
      }
      .invoice-table th,
      .invoice-table td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid #ecf0f1;
      }
      .invoice-table th {
        background: #f8f9fa;
        font-weight: 600;
        color: #2c3e50;
      }
      .invoice-table tr:hover {
        background: #f8f9fa;
      }
      .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.875rem;
        font-weight: 500;
      }
      .status-badge.paid {
        background: #d4edda;
        color: #155724;
      }
      .status-badge.pending {
        background: #fff3cd;
        color: #856404;
      }
      .view-btn {
        background: #95a5a6;
        color: white;
        border: none;
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        cursor: pointer;
      }
      .view-btn:hover {
        background: #7f8c8d;
      }
    `,
  ],
})
export class InvoiceComponent {
  invoices = [
    { id: 'INV-001', customer: 'John Smith', date: '2024-01-15', amount: 1250, status: 'Paid' },
    {
      id: 'INV-002',
      customer: 'Sarah Johnson',
      date: '2024-01-18',
      amount: 750,
      status: 'Pending',
    },
    { id: 'INV-003', customer: 'Michael Brown', date: '2024-01-20', amount: 2300, status: 'Paid' },
    { id: 'INV-004', customer: 'Emily Davis', date: '2024-01-22', amount: 500, status: 'Pending' },
    { id: 'INV-005', customer: 'David Wilson', date: '2024-01-25', amount: 1800, status: 'Paid' },
  ];
}
