import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Customer, CustomerDropDown } from '../models/CustomerModel';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private apiUrl = 'http://localhost:5156/api/customer'; // adjust port

  constructor(private http: HttpClient) {}

  getCustomers(): Promise<Customer[]> {
    return firstValueFrom(this.http.get<Customer[]>(this.apiUrl));
  }

  getCustomer(id: number): Promise<Customer> {
    return firstValueFrom(this.http.get<Customer>(`${this.apiUrl}/${id}`));
  }

  createCustomer(customer: Customer): Promise<Customer> {
    return firstValueFrom(this.http.post<Customer>(this.apiUrl, customer));
  }

  updateCustomer(customer: Customer): Promise<void> {
    return firstValueFrom(this.http.put<void>(`${this.apiUrl}/${customer.id}`, customer));
  }

  deleteCustomer(id: number): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
  }

  getCustomerDropdown(): Promise<CustomerDropDown[]> {
    return firstValueFrom(this.http.get<CustomerDropDown[]>(`${this.apiUrl}/dropdown`));
  }
}
