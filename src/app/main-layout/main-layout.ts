// src/app/main-layout/main-layout.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="app-container">
      <aside class="sidebar">
        <div class="sidebar-header">
          <h2>Menu</h2>
        </div>
        <nav class="sidebar-nav">
          <a routerLink="/products" routerLinkActive="active" class="nav-item">
            <span class="nav-icon">📦</span>
            <span>Products</span>
          </a>
          <a routerLink="/invoices" routerLinkActive="active" class="nav-item">
            <span class="nav-icon">📄</span>
            <span>Invoices</span>
          </a>
          <a routerLink="/customers" routerLinkActive="active" class="nav-item">
            <span class="nav-icon">👥</span>
            <span>Customers</span>
          </a>
          <a routerLink="/reports/invoices" routerLinkActive="active" class="nav-item">
            <span class="nav-icon">📊</span>
            <span>Invoice Report</span>
          </a>
        </nav>
        <div class="sidebar-footer">
          <button (click)="logout()" class="logout-btn"><span>🚪</span> Logout</button>
        </div>
      </aside>
      <main class="main-content">
        <div class="content-wrapper">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [
    `
      .app-container {
        display: flex;
        height: 100vh;
        width: 100%;
      }
      .sidebar {
        width: 260px;
        background: #2c3e50;
        color: white;
        display: flex;
        flex-direction: column;
        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
      }
      .sidebar-header {
        padding: 1.5rem;
        border-bottom: 1px solid #34495e;
      }
      .sidebar-header h2 {
        margin: 0;
        font-size: 1.5rem;
        color: #ecf0f1;
      }
      .sidebar-nav {
        flex: 1;
        padding: 1rem 0;
      }
      .nav-item {
        display: flex;
        align-items: center;
        padding: 0.75rem 1.5rem;
        color: #ecf0f1;
        text-decoration: none;
        transition: all 0.3s;
        gap: 0.75rem;
      }
      .nav-item:hover {
        background: #34495e;
      }
      .nav-item.active {
        background: #3498db;
        color: white;
      }
      .nav-icon {
        font-size: 1.2rem;
      }
      .sidebar-footer {
        padding: 1rem;
        border-top: 1px solid #34495e;
      }
      .logout-btn {
        width: 100%;
        padding: 0.75rem;
        background: #e74c3c;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        font-size: 1rem;
        transition: background 0.3s;
      }
      .logout-btn:hover {
        background: #c0392b;
      }
      .main-content {
        flex: 1;
        background: #f5f6fa;
        overflow-y: auto;
      }
      .content-wrapper {
        padding: 2rem;
      }
      @media (max-width: 768px) {
        .sidebar {
          width: 80px;
        }
        .sidebar-header h2 {
          display: none;
        }
        .nav-item span:last-child {
          display: none;
        }
        .nav-item {
          justify-content: center;
          padding: 0.75rem;
        }
        .logout-btn span:last-child {
          display: none;
        }
      }
    `,
  ],
})
export class MainLayoutComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  logout(): void {
    this.authService.logout();
  }
}
