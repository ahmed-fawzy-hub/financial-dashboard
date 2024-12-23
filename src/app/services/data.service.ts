import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private metadataCache: any | null = null; // تخزين مؤقت للبيانات
  private metadataSubject = new BehaviorSubject<any | null>(null);
  constructor(private http: HttpClient) {}

  getMetadata(): Observable<any> {
    if (this.metadataCache) {
      
      return of(this.metadataCache);
    }

    return this.http.get('/data/metadata.json').pipe(
      tap((data) => {
        this.metadataCache = data;
        this.metadataSubject.next(data);
      })
    );
  }

  getCandle(): Observable<any> {
    return this.http.get('/data/candle.json');
  }
  // إعادة تعيين التخزين المؤقت
  clearCache(): void {
    this.metadataCache = null;
    this.metadataSubject.next(null);
  }

  
  getMetadataSubject(): BehaviorSubject<any | null> {
    return this.metadataSubject;
  }
  getPagedData(page: number, pageSize: number): Observable<any> {
    
    return this.http.get(`data/metadata.json`).pipe(
      map((data: any) => {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        return {
          items: data.hits.hits.slice(start, end).map((hit: any) => hit._source),
          total: data.hits.hits.length,
        };
      })
    );
  }
}
