import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InvoiceService } from '../../services/invoice';
import { SalesInvoice } from '../../models/sales-invoicemodel';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="invoice-container">
      <div class="header-section">
        <h1>Sales Invoices</h1>
        <button class="add-btn" routerLink="/invoices/create">+ Create Invoice</button>
      </div>
      <div class="invoice-table-wrapper">
        <table class="invoice-table">
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>Date</th>
              <th>Customer Code</th>
              <th>Address</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let inv of invoices; trackBy: trackByInvoiceNo">
              <td>{{ inv.invoiceNo }}</td>
              <td>{{ inv.date | date: 'yyyy-MM-dd' }}</td>
              <td>{{ inv.customerCode }}</td>
              <td>{{ inv.address }}</td>
              <td>{{ inv.total | currency }}</td>
              <td>
                <button class="view-btn" (click)="viewInvoice(inv.invoiceNo)">View</button>
                <button class="delete-btn" (click)="deleteInvoice(inv.invoiceNo)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal for Invoice Details -->
    <div class="modal-overlay" *ngIf="showModal" (click)="closeModal()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>Invoice Details</h2>
          <button class="close-btn" (click)="closeModal()">&times;</button>
        </div>
        <div class="modal-body" *ngIf="selectedInvoice">
          <p><strong>Invoice No:</strong> {{ selectedInvoice.invoiceNo }}</p>
          <p><strong>Date:</strong> {{ selectedInvoice.date | date: 'yyyy-MM-dd' }}</p>
          <p><strong>Customer Code:</strong> {{ selectedInvoice.customerCode }}</p>
          <p><strong>Address:</strong> {{ selectedInvoice.address }}</p>
          <p><strong>Total:</strong> {{ selectedInvoice.total | currency }}</p>
          <h3>Items</h3>
          <table class="items-table">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of selectedInvoice.items">
                <td>{{ item.productId }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.rate | currency }}</td>
                <td>{{ item.amount | currency }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button class="close-modal-btn" (click)="closeModal()">Close</button>
        </div>
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
        margin-bottom: 1.5rem;
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
      .invoice-table-wrapper {
        overflow-x: auto;
      }
      .invoice-table {
        width: 100%;
        border-collapse: collapse;
      }
      .invoice-table th,
      .invoice-table td {
        padding: 0.75rem;
        text-align: left;
        border-bottom: 1px solid #ecf0f1;
      }
      .invoice-table th {
        background: #f8f9fa;
      }
      .view-btn {
        background: #3498db;
        color: white;
        border: none;
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        cursor: pointer;
        margin-right: 0.5rem;
      }
      .delete-btn {
        background: #e74c3c;
        color: white;
        border: none;
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        cursor: pointer;
      }
      /* Modal Styles */
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }
      .modal-content {
        background: white;
        border-radius: 8px;
        width: 80%;
        max-width: 800px;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      }
      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-bottom: 1px solid #ecf0f1;
      }
      .modal-header h2 {
        margin: 0;
      }
      .close-btn {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
      }
      .modal-body {
        padding: 1rem;
      }
      .items-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 0.5rem;
      }
      .items-table th,
      .items-table td {
        padding: 0.5rem;
        text-align: left;
        border-bottom: 1px solid #ecf0f1;
      }
      .items-table th {
        background: #f8f9fa;
      }
      .modal-footer {
        padding: 1rem;
        border-top: 1px solid #ecf0f1;
        text-align: right;
      }
      .close-modal-btn {
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
export class InvoiceListComponent implements OnInit {
  invoices: SalesInvoice[] = [];
  selectedInvoice: SalesInvoice | null = null; // Fixed: use SalesInvoice type
  showModal = false;

  constructor(private invoiceService: InvoiceService) {}

  async ngOnInit() {
    await this.loadInvoices();
  }

  async loadInvoices() {
    this.invoices = await this.invoiceService.getInvoices();
  }

  async deleteInvoice(invoiceNo: string) {
    if (confirm(`Delete invoice ${invoiceNo}?`)) {
      await this.invoiceService.deleteInvoice(invoiceNo);
      await this.loadInvoices();
    }
  }

  // View invoice details (finds from already loaded list)
  viewInvoice(invoiceNo: string) {
    const invoice = this.invoices.find((inv) => inv.invoiceNo === invoiceNo);
    if (invoice) {
      this.selectedInvoice = invoice;
      this.showModal = true;
    } else {
      alert('Invoice not found');
    }
  }

  closeModal() {
    this.showModal = false;
    this.selectedInvoice = null;
  }

  trackByInvoiceNo(index: number, invoice: SalesInvoice): string {
    return invoice.invoiceNo;
  }
}
