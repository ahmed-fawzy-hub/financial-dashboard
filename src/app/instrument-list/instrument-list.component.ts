import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Instrument } from '../user.interface';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-instrument-list',
  imports: [NgFor, FormsModule],
  templateUrl: './instrument-list.component.html',
  styleUrl: './instrument-list.component.css'
})

export class InstrumentListComponent {
  instruments: Instrument[] = [];  // مصفوفة الأدوات المالية
  filteredInstruments: Instrument[] = [];  // مصفوفة الأدوات بعد التصفية
  searchQuery: string = '';  // نص البحث
  selectedCategory: string = 'All';  // الفئة المحددة
  categories: string[] = ['All', 'Stock', 'Cryptocurrency', 'ETF', 'Fund', 'Index', 'Commodity'];  // الفئات المتاحة

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // تحميل بيانات metadata من خدمة DataService
    this.dataService.getMetadata().subscribe((data) => {
      this.instruments = data.hits.hits.map((hit: any) => hit._source);  // تحويل البيانات إلى مصفوفة الأدوات
      this.filteredInstruments = [...this.instruments];  // نسخ الأدوات المالية للتمكن من تصفيتها
    });
  }

  // تصفية الأدوات المالية حسب الفئة
  filterByCategory(): void {
    if (this.selectedCategory === 'All') {
      this.filteredInstruments = this.instruments.filter(instrument =>
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

  // تحديث البحث والتصفية معًا
  onSearch(): void {
    this.filterByCategory();
  }
}
