import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen: boolean = false; // للتحكم في فتح/إغلاق القائمة في الجوال

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
