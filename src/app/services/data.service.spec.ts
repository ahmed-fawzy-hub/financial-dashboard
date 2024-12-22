import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });

    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch metadata', () => {
    const dummyMetadata = { hits: { hits: [{ _source: { name: 'Test' } }] } };

    service.getMetadata().subscribe((data) => {
      expect(data).toEqual(dummyMetadata);
    });

    const req = httpMock.expectOne('/assets/data/metadata.json');
    expect(req.request.method).toBe('GET');
    req.flush(dummyMetadata);
  });
});