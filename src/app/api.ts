import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient

@Injectable({ providedIn: 'root' })
export class ApiService {
  //  IMPORTANT: Use the URL from step 1
  private apiUrl = 'http://localhost:5156/api'; // Replace '5xxx' with your .NET port!

  // Inject HttpClient into the service
  constructor(private http: HttpClient) {}

  // A simple method to get products
  getProducts() {
    return this.http.get(`${this.apiUrl}/Products`);
  }
}
