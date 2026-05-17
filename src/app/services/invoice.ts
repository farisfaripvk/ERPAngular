import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { SalesInvoice, InvoiceDetail, InvoiceReportItem } from '../models/sales-invoicemodel';
import { environment } from '../../environments/environment'; // Adjust path if needed

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  // private apiUrl = 'http://localhost:5156/api/salesinvoice';
  private baseUrl = environment.apiUrl; // e.g., 'http://localhost:5156' or live URL
  private apiUrl = `${this.baseUrl}/api/salesinvoice`; // Full endpoint

  constructor(private http: HttpClient) {}

  getInvoices(): Promise<SalesInvoice[]> {
    return firstValueFrom(this.http.get<SalesInvoice[]>(this.apiUrl));
  }

  getInvoice(invoiceNo: string): Promise<SalesInvoice> {
    return firstValueFrom(this.http.get<SalesInvoice>(`${this.apiUrl}/${invoiceNo}`));
  }

  createInvoice(invoice: SalesInvoice): Promise<SalesInvoice> {
    return firstValueFrom(this.http.post<SalesInvoice>(this.apiUrl, invoice));
  }

  deleteInvoice(invoiceNo: string): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${invoiceNo}`));
  }

  getInvoiceDetails(invoiceNo: string): Promise<InvoiceDetail> {
    return firstValueFrom(this.http.get<InvoiceDetail>(`${this.apiUrl}/${invoiceNo}/details`));
  }

  getReport(filters: any): Promise<InvoiceReportItem[]> {
    return firstValueFrom(this.http.post<InvoiceReportItem[]>(`${this.apiUrl}/report`, filters));
  }
}
