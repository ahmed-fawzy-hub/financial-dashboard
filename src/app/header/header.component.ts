import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen: boolean = false; // للتحكم في فتح/إغلاق القائمة في الجوال

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
