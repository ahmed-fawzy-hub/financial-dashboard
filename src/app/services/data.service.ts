import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor(private http: HttpClient) {}

  // تحميل بيانات metadata.json
  getMetadata(): Observable<any> {
    return this.http.get('/assets/data/metadata.json');
  }

  // تحميل بيانات candle.json
  getCandle(): Observable<any> {
    return this.http.get('/assets/data/candle.json');
  }

  // تحميل بيانات exchange.json
  getExchange(): Observable<any> {
    return this.http.get('/assets/data/exchange.json');
  }
}
