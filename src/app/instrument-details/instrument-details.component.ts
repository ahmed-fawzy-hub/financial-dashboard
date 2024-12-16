import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Candle } from '../candle.model';
import { Instrument } from '../user.interface';
import { NgChartsModule } from 'ng2-charts';  // استيراد NgChartsModule بدلاً من ChartsModule

@Component({
  selector: 'app-instrument-details',
  standalone: true,  // تأكيد أن المكون مستقل
  imports: [NgChartsModule],  // إضافة NgChartsModule هنا
  templateUrl: './instrument-details.component.html',
  styleUrls: ['./instrument-details.component.css']
})
export class InstrumentDetailsComponent {
  instrument: Instrument | undefined;
  candleData: Candle[] = [];
  chartData: any[] = [];
  chartLabels: string[] = [];

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit(): void {
    const symbol = this.route.snapshot.paramMap.get('symbol');

    // تحميل بيانات metadata
    this.dataService.getMetadata().subscribe((data) => {
      const instruments = data.hits.hits.map((hit: any) => hit._source);
      this.instrument = instruments.find((inst: Instrument) => inst.symbol === symbol);
    });

    // تحميل بيانات الشموع (candle)
    this.dataService.getCandle().subscribe((data) => {
      this.candleData = data.hits.hits
        .map((hit: any) => hit._source)
        .filter((candle: Candle) => candle.symbol === symbol);

      // إعداد البيانات للرسم البياني
      this.prepareChartData();
    });
  }

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
