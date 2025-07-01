import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PetsService } from './pets.service';
import { environment } from '../../../environments/environment';

describe('PetsService', () => {
  let service: PetsService;
  let httpMock: HttpTestingController;
  const baseUrl = `${environment.baseUrl}/pets`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PetsService],
    });
    service = TestBed.inject(PetsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // ensure no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch weekly sales data', () => {
    const mockDate = '2025-06-01';
    const mockResponse = {
      categories: ['2025-05-31', '2025-06-01'],
      series: [
        { name: 'dog', data: [100, 200] },
        { name: 'cat', data: [150, 250] },
      ],
    };

    service.getWeeklySales(mockDate).subscribe((res) => {
      expect(res.categories.length).toBe(2);
      expect(res.series.length).toBe(2);
      expect(res.series[0].name).toBe('dog');
    });

    const req = httpMock.expectOne(`${baseUrl}/7days/${mockDate}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch daily sales data', () => {
    const mockDate = '2025-06-01';
    const mockResponse = [
      { date: mockDate, animal: 'dog', price: '100.00' },
      { date: mockDate, animal: 'cat', price: '150.00' },
    ];

    service.getDailySales(mockDate).subscribe((res) => {
      expect(res.length).toBe(2);
      expect(res[0].animal).toBe('dog');
    });

    const req = httpMock.expectOne(`${baseUrl}/${mockDate}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
