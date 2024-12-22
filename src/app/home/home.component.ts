import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  imports: [RouterModule,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  instruments: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getMetadata().subscribe({
      next: (data) => {
        this.instruments = data.hits.hits.map((hit: any) => hit._source);
        console.log('Instruments loaded:', this.instruments);
      },
      error: (err) => {
        console.error('Error loading instruments:', err);
      },
    });
  }
}
