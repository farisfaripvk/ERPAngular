import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvoiceService } from '../../services/invoice';
import { CustomerService } from '../../services/customer';

@Component({
  selector: 'app-invoice-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="report-container">
      <h2>Invoice Report</h2>

      <div class="filters">
        <div class="filter-group">
          <label>From Date</label>
          <input type="date" [(ngModel)]="startDate" />
        </div>
        <div class="filter-group">
          <label>To Date</label>
          <input type="date" [(ngModel)]="endDate" />
        </div>
        <div class="filter-group">
          <label>Customer</label>
          <select [(ngModel)]="selectedCustomerCode">
            <option value="">-- All Customers --</option>
            <option *ngFor="let c of customers" [value]="c.code">
              {{ c.name }} ({{ c.code }})
            </option>
          </select>
        </div>
        <div class="filter-buttons">
          <button (click)="search()">Search</button>
          <button (click)="reset()">Reset</button>
        </div>
      </div>

      <div class="results" *ngIf="reportData.length > 0">
        <table>
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>Date</th>
              <th>Customer Code</th>
              <th>Address</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let inv of reportData">
              <td>{{ inv.invoiceNo }}</td>
              <td>{{ inv.date | date }}</td>
              <td>{{ inv.customerCode }}</td>
              <td>{{ inv.address }}</td>
              <td>{{ inv.total | currency }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div *ngIf="reportData.length === 0 && searched" class="no-data">No invoices found</div>
    </div>
  `,
  styles: [
    `
      .report-container {
        padding: 1rem;
      }
      .filters {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        align-items: flex-end;
        margin-bottom: 1.5rem;
      }
      .filter-group {
        display: flex;
        flex-direction: column;
      }
      .filter-group label {
        font-weight: bold;
        margin-bottom: 0.25rem;
      }
      .filter-group input,
      select {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .filter-buttons button {
        margin-right: 0.5rem;
        padding: 0.5rem 1rem;
        background: #3498db;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
      }
      th,
      td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      th {
        background: #f2f2f2;
      }
      .no-data {
        text-align: center;
        margin-top: 2rem;
        color: #e74c3c;
      }
    `,
  ],
})
export class InvoiceReportComponent implements OnInit {
  startDate: string = '';
  endDate: string = '';
  selectedCustomerCode: string = '';
  customers: any[] = [];
  reportData: any[] = [];
  searched: boolean = false;

  constructor(
    private invoiceService: InvoiceService,
    private customerService: CustomerService,
  ) {}

  async ngOnInit() {
    await this.loadCustomers();
  }

  async loadCustomers() {
    this.customers = await this.customerService.getCustomerDropdown();
  }

  async search() {
    const filters = {
      startDate: this.startDate ? new Date(this.startDate) : null,
      endDate: this.endDate ? new Date(this.endDate) : null,
      customerCode: this.selectedCustomerCode || null,
    };
    this.reportData = await this.invoiceService.getReport(filters);
  }

  reset() {
    this.startDate = '';
    this.endDate = '';
    this.selectedCustomerCode = '';
    this.reportData = [];
  }
}
