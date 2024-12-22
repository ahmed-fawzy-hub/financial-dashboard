import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Candle } from '../candle.model';
import { Instrument } from '../user.interface';
import { NgChartsModule } from 'ng2-charts';  // استيراد NgChartsModule
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-instrument-details',
  standalone: true,
  imports: [NgChartsModule, NgIf],  // لا تقم بإضافة HttpClientModule هنا
  templateUrl: './instrument-details.component.html',
  styleUrls: ['./instrument-details.component.css'],
})
export class InstrumentDetailsComponent {
  instrument: any; // بيانات الأداة
  candleData: any[] = []; // بيانات الشموع
  chartData: any[] = []; // تعريف chartData هنا
  chartLabels: string[] = []; // تعريف chartLabels للرسم البياني

  constructor(public route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit(): void {
    const symbol = this.route.snapshot.paramMap.get('symbol');
    console.log('Symbol from route:', symbol);

    // تحميل بيانات metadata
    this.dataService.getMetadata().subscribe({
      next: (data) => {
        const instruments = data.hits.hits.map((hit: any) => hit._source);
        this.instrument = instruments.find((inst: any) => inst.symbol === symbol);
        console.log('Found instrument:', this.instrument);
      },
      error: (err) => {
        console.error('Error loading metadata:', err);
      },
    });

    // تحميل بيانات الشموع
    this.dataService.getCandle().subscribe({
      next: (data) => {
        this.candleData = data.hits.hits
          .map((hit: any) => hit._source)
          .filter((candle: any) => candle.symbol === symbol);
        console.log('Filtered candle data:', this.candleData);

        // إعداد البيانات للرسم البياني
        this.prepareChartData();
      },
      error: (err) => {
        console.error('Error loading candle data:', err);
      },
    });
  }

  // إعداد البيانات للرسم البياني
  prepareChartData(): void {
    this.chartLabels = this.candleData.map((candle) =>
      new Date(candle.dateTime).toLocaleDateString()
    );
    this.chartData = [
      {
        data: this.candleData.map((candle) => candle.endPrice),
        label: 'End Price',
      },
    ];
  }
  
}
