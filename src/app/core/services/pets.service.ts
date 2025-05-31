import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PetsService {
  private baseUrl = 'https://www.melivecode.com/api/pets';

  constructor(private http: HttpClient) {}

  getWeeklySales(date: string): Observable<{ categories: any; series: any }> {
    return this.http.get<{ categories: any; series: any }>(
      `${this.baseUrl}/7days/${date}`
    );
  }

  getDailySales(date: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${date}`);
  }
}
