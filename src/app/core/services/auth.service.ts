import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loginUrl = `${environment.baseUrl}/login`;
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
          const expiresIn = 12 * 60 * 60 * 1000;
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
      this.logout();
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
