import { Routes } from '@angular/router';
//----new components and guard imports
import { LoginComponent } from './login/login';
import { MainLayoutComponent } from './main-layout/main-layout';
import { ProductComponent } from './product/product';
import { InvoiceComponent } from './invoice/invoice';
import { AuthGuard } from './guards/auth-guard';

import { AddProductComponent } from './product/add-product/add-product';

import { CustomerListComponent } from './customer/customer-list/customer-list';
import { CustomerFormComponent } from './customer/customer-form/customer-form';

import { InvoiceListComponent } from './invoice/invoice-list/invoice-list';
import { InvoiceFormComponent } from './invoice/invoice-form/invoice-form';
import { InvoiceReportComponent } from './reports/invoice-report/invoice-report';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'products/add', component: AddProductComponent },
      { path: 'products', component: ProductComponent },

      { path: 'customers/edit/:id', component: CustomerFormComponent },
      { path: 'customers/add', component: CustomerFormComponent },
      { path: 'customers', component: CustomerListComponent },

      { path: 'invoices/create', component: InvoiceFormComponent },
      { path: 'invoices', component: InvoiceListComponent },
      // { path: 'invoices', component: InvoiceComponent },

      { path: 'reports/invoices', component: InvoiceReportComponent },

      { path: '', redirectTo: 'products', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '' },
];
