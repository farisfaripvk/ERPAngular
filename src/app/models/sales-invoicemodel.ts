import { InvoiceItem } from './invoice-itemmodel';

export interface SalesInvoice {
  invoiceNo: string;
  date: string; // ISO string
  customerCode: string;
  address: string;
  total: number;
  items: InvoiceItem[];
}

export interface InvoiceItemDetail {
  productId: number;
  quantity: number;
  rate: number;
  amount: number;
}

export interface InvoiceDetail {
  invoiceNo: string;
  date: string;
  customerCode: string;
  address: string;
  total: number;
  items: InvoiceItemDetail[];
}

export interface InvoiceReportItem {
  invoiceNo: string;
  date: string;
  customerCode: string;
  address: string;
  total: number;
}
