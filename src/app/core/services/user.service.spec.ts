import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserService } from './user.service';
import { apiUser } from '../models/users.model';
import { environment } from './../../../environments/environment';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.baseUrl}/users`;

  const mockUsers: apiUser[] = [
    {
      id: 1,
      fname: 'John',
      lname: 'Doe',
      username: 'jdoe',
      email: 'john@example.com',
      avatar: '',
      password: '1234',
    },
    {
      id: 2,
      fname: 'Jane',
      lname: 'Smith',
      username: 'jsmith',
      email: 'jane@example.com',
      avatar: '',
      password: '1234',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users with params', () => {
    service.getUsers('john', 1, 5, 'email', 'desc').subscribe((res) => {
      expect(res.data.length).toBe(2);
      expect(res.total).toBe(2);
    });

    const req = httpMock.expectOne(
      (req) =>
        req.url === apiUrl &&
        req.params.get('search') === 'john' &&
        req.params.get('page') === '1' &&
        req.params.get('per_page') === '5' &&
        req.params.get('sort_column') === 'email' &&
        req.params.get('sort_order') === 'desc'
    );

    expect(req.request.method).toBe('GET');
    req.flush({ data: mockUsers, total: 2 });
  });

  it('should create a user', () => {
    const newUser: apiUser = {
      id: 3,
      fname: 'Alice',
      lname: 'Johnson',
      username: 'alicej',
      email: 'alice@example.com',
      avatar: '',
      password: '1234',
    };

    service.createUser(newUser).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(`${apiUrl}/create`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);
    req.flush({ status: 'success' });
  });

  it('should update a user', () => {
    const updatedUser: Partial<apiUser> = {
      id: 1,
      fname: 'UpdatedName',
    };

    service.updateUser(updatedUser).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(`${apiUrl}/update`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedUser);
    req.flush({ status: 'updated' });
  });

  it('should delete a user', () => {
    const userId = 1;

    service.deleteUser(userId).subscribe((res) => {
      expect(res.status).toBe('success');
      expect(res.message).toBe('User deleted');
    });

    const req = httpMock.expectOne(`${apiUrl}/delete`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.body).toEqual({ id: userId });
    req.flush({ status: 'success', message: 'User deleted' });
  });
});
