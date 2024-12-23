import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Candle } from '../candle.model';
import { Instrument } from '../user.interface';
import { NgChartsModule } from 'ng2-charts';  
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-instrument-details',
  standalone: true,
  imports: [NgChartsModule, NgIf],  
  templateUrl: './instrument-details.component.html',
  styleUrls: ['./instrument-details.component.css'],
})
export class InstrumentDetailsComponent {
  instrument: any; 
  candleData: any[] = []; 
  chartData: any[] = []; 
  chartLabels: string[] = []; 

  constructor(public route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit(): void {
    const symbol = this.route.snapshot.paramMap.get('symbol');
    console.log('Symbol from route:', symbol);

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

    this.dataService.getCandle().subscribe({
      next: (data) => {
        this.candleData = data.hits.hits
          .map((hit: any) => hit._source)
          .filter((candle: any) => candle.symbol === symbol);
        console.log('Filtered candle data:', this.candleData);

        this.prepareChartData();
      },
      error: (err) => {
        console.error('Error loading candle data:', err);
      },
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
