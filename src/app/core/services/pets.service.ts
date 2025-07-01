import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PetsService {
  private baseUrl = `${environment.baseUrl}/pets`;

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
