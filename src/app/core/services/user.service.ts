import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

export interface User {
  id: number;
  name: string;
  email: string;
  // add more fields as needed
}

export interface apiUser {
  id: number;
  fname: string;
  lname: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = `${environment.baseUrl}/users`;

  constructor(private http: HttpClient) {}

  getUsers(
    search = '',
    page = 1,
    limit = 10,
    sortBy = 'id',
    sortDir = 'asc'
  ): Observable<{ data: User[]; total: number }> {
    let params = new HttpParams()
      .set('search', search)
      .set('page', page.toString())
      .set('per_page', limit.toString())
      .set('sort_column', sortBy)
      .set('sort_order', sortDir);

    return this.http.get<{ data: User[]; total: number }>(this.apiUrl, {
      params: params,
    });
  }

  // TODO: Partial<User>
  createUser(user: apiUser) {
    return this.http.post(`${this.apiUrl}/create`, user);
  }

  // TODO: Partial<User>
  updateUser(user: Partial<apiUser>) {
    return this.http.put(`${this.apiUrl}/update`, user);
  }

  deleteUser(id: number) {
    return this.http.delete<{ status: string; message: string }>(
      `${this.apiUrl}/delete`,
      { body: { id } }
    );
  }
}
