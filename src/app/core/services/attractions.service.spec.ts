import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AttractionService } from './attraction.service';
import { AuthService } from './auth.service';
import { Attractions } from '../models/attractions.model';
import { environment } from './../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

describe('AttractionService', () => {
  let service: AttractionService;
  let httpMock: HttpTestingController;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  const apiUrl = `${environment.baseUrl}/attractions`;
  const authApiUrl = `${environment.baseUrl}/auth/attractions`;

  const mockAttractions: Attractions[] = [
    {
      id: 1,
      name: 'Zoo',
      coverimage: '',
      detail: '',
      location: '',
      latitude: '',
      longitude: '',
    },
    {
      id: 2,
      name: 'Aquarium',
      coverimage: '',
      detail: '',
      location: '',
      latitude: '',
      longitude: '',
    },
  ];

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['getToken']);
    mockAuthService.getToken.and.returnValue('mock-token');

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AttractionService,
        { provide: AuthService, useValue: mockAuthService },
      ],
    });

    service = TestBed.inject(AttractionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch attractions with query params', () => {
    service.getAttractions('zoo', 2, 5, 'name', 'desc').subscribe((res) => {
      expect(res.data.length).toBe(2);
      expect(res.total).toBe(2);
    });

    const req = httpMock.expectOne(
      (r) =>
        r.url === apiUrl &&
        r.params.get('search') === 'zoo' &&
        r.params.get('page') === '2' &&
        r.params.get('per_page') === '5' &&
        r.params.get('sort_column') === 'name' &&
        r.params.get('sort_order') === 'desc'
    );

    expect(req.request.method).toBe('GET');
    req.flush({ data: mockAttractions, total: 2 });
  });

  it('should create an attraction with auth header', () => {
    const newAttraction: Attractions = {
      id: 3,
      name: 'Park',
      coverimage: '',
      detail: '',
      latitude: 0,
      longitude: 0,
    };

    service.createAttraction(newAttraction).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(`${authApiUrl}/create`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
    expect(req.request.body).toEqual(newAttraction);

    req.flush({ status: 'success' });
  });

  it('should update an attraction with auth header', () => {
    const updated: Attractions = {
      id: 1,
      name: 'Updated Zoo',
      coverimage: '',
      detail: '',
      latitude: 0,
      longitude: 0,
    };

    service.updateAttraction(updated).subscribe((res: Attractions) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(`${authApiUrl}/update`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
    expect(req.request.body).toEqual(updated);

    req.flush({ status: 'updated' });
  });

  it('should delete an attraction with body param', () => {
    service.deleteAttraction(1).subscribe((res: any) => {
      expect(res.status).toBe('success');
      expect(res.message).toBe('Deleted successfully');
    });

    const req = httpMock.expectOne(`${apiUrl}/delete`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.body).toEqual({ id: 1 });

    req.flush({ status: 'success', message: 'Deleted successfully' });
  });
});
