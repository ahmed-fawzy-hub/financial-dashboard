import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  categories = [
    { name: 'Stocks', icon: '📈', route: '/stocks' },
    { name: 'Cryptocurrency', icon: '💰', route: '/cryptocurrency' },
    { name: 'ETFs', icon: '📊', route: '/etfs' },
    { name: 'Funds', icon: '🏦', route: '/funds' },
    { name: 'Indexes', icon: '📉', route: '/indexes' },
    { name: 'Commodities', icon: '⚙️', route: '/commodities' }
  ];
}
