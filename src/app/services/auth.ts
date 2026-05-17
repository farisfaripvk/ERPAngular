import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5156/api/auth/login'; // adjust port
  private isLoggedIn = false;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    // const token = localStorage.getItem('auth_token');
    // this.isLoggedIn = !!token;

    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      this.isLoggedIn = !!token;
    }
  }

  async login(username: string, password: string): Promise<boolean> {
    try {
      const response: any = await firstValueFrom(
        this.http.post(this.apiUrl, { username, password }),
      );
      if (response.success) {
        // Store a dummy token or a real JWT if you implement it
        localStorage.setItem('auth_token', 'user-token');
        localStorage.setItem('userName', response.userName);
        this.isLoggedIn = true;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error', error);
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('userName');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
