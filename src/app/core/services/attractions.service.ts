import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { AuthService } from './auth.service';
import { Attractions } from '../models/attractions.model';

@Injectable({ providedIn: 'root' })
export class AttractionService {
  private apiUrl = `${environment.baseUrl}/attractions`;
  private authApiUrl = `${environment.baseUrl}/auth/attractions`;

  constructor(private http: HttpClient, private auth: AuthService) {}

  getAttractions(
    search = '',
    page = 1,
    limit = 10,
    sortBy = 'id',
    sortDir = 'asc'
  ): Observable<{ data: Attractions[]; total: number }> {
    let params = new HttpParams()
      .set('search', search)
      .set('page', page.toString())
      .set('per_page', limit.toString())
      .set('sort_column', sortBy)
      .set('sort_order', sortDir);

    return this.http.get<{ data: Attractions[]; total: number }>(this.apiUrl, {
      params: params,
    });
  }

  createAttraction(attraction: Attractions) {
    const token = this.auth.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.authApiUrl}/create`, attraction, { headers });
  }

  updateAttraction(attraction: Attractions) {
    const token = this.auth.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(`${this.authApiUrl}/update`, attraction, { headers });
  }

  deleteAttraction(id: number) {
    return this.http.delete<{ status: string; message: string }>(
      `${this.apiUrl}/delete`,
      { body: { id } }
    );
  }
}
