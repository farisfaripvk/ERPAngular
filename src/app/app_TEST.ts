import { Component, OnInit } from '@angular/core';
// import { ApiService } from '/api.service';
import { ApiService } from './api'; // Import the ApiService
// import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  // imports: [CommonModule],
  template: `
    <h1>Products from API</h1>
    <p>Number of products : {{ products.length }}</p>
    <ul>
      @for (product of products; track product) {
        <li>Farispppp d</li>
        <li>{{ product.name }} - {{ product.price }}</li>
      }
    </ul>
  `,
})
export class AppComponent implements OnInit {
  products: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // this.apiService.getProducts().subscribe((data: any) => {
    //   this.products = data;
    // });

    this.apiService.getProducts().subscribe({
      next: (data: any) => {
        console.log('RAW data from API:', JSON.stringify(data, null, 2));
        console.log('Is it an array?', Array.isArray(data));
        console.log('Length:', data?.length);

        this.products = data;
        debugger;

        // Force a re-check after assignment
        setTimeout(() => {
          console.log('After assignment, products =', this.products);
        }, 0);
      },
      error: (err) => console.error('API error:', err),
    });
  }
}
