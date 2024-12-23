import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Instrument } from '../user.interface';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-instrument-list',
  imports: [NgFor, FormsModule, ScrollingModule, RouterModule],
  templateUrl: './instrument-list.component.html',
  styleUrl: './instrument-list.component.css'
})

export class InstrumentListComponent {
  instruments: Instrument[] = [];  
  filteredInstruments: Instrument[] = [];  
  searchQuery: string = '';  
  selectedCategory: string = 'All';  
  categories: string[] = ['All', 'Stock', 'Cryptocurrency', 'ETF', 'Fund', 'Index', 'Commodity']; 
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getMetadata().subscribe((data) => {
      this.instruments = data.hits.hits.map((hit: any) => hit._source);  
      this.filteredInstruments = [...this.instruments];  
      
    });
  }

  filterByCategory(): void {
    if (this.selectedCategory === 'All') {
      this.filteredInstruments = this.instruments.filter((instrument) =>
        instrument.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredInstruments = this.instruments.filter(
        (instrument) =>
          instrument.type === this.selectedCategory &&
          instrument.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  onSearch(): void {
    this.filterByCategory();
  }

  clearCache(): void {
    this.dataService.clearCache();
  }
}
