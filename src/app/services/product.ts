import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Product } from '../models/product.models';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://localhost:5156/api/products'; // adjust port

  constructor(private http: HttpClient) {}

  getProducts(): Promise<Product[]> {
    return firstValueFrom(this.http.get<Product[]>(this.apiUrl));
  }

  getProduct(id: number): Promise<Product> {
    return firstValueFrom(this.http.get<Product>(`${this.apiUrl}/${id}`));
  }

  createProduct(product: Product): Promise<Product> {
    return firstValueFrom(this.http.post<Product>(this.apiUrl, product));
  }

  updateProduct(product: Product): Promise<void> {
    return firstValueFrom(this.http.put<void>(`${this.apiUrl}/${product.id}`, product));
  }

  deleteProduct(id: number): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
  }
}
