import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loginUrl = 'https://www.melivecode.com/api/login';
  private tokenKey = 'accessToken';
  private expiryKey = 'tokenExpiry';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http
      .post<any>(this.loginUrl, {
        username,
        password,
        expiresIn: 12 * 60 * 60 * 1000,
      })
      .pipe(
        tap((response) => {
          const token = response.accessToken;
          const expiresIn = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
          const expiryTime = new Date().getTime() + expiresIn;

          sessionStorage.setItem(this.tokenKey, token);
          sessionStorage.setItem(this.expiryKey, expiryTime.toString());
        })
      );
  }

  getToken(): string | null {
    const expiry = sessionStorage.getItem(this.expiryKey);
    if (expiry && +expiry > new Date().getTime()) {
      return sessionStorage.getItem(this.tokenKey);
    } else {
      this.logout(); // Expired
      return null;
    }
  }

  logout() {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.expiryKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
