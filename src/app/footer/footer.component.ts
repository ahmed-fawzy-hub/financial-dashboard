import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [NgFor],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  email = 'contact@financialdashboard.com';
  socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com', icon: 'fab fa-facebook-f' },
    { name: 'Twitter', url: 'https://twitter.com', icon: 'fab fa-twitter' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'fab fa-linkedin-in' },
    { name: 'GitHub', url: 'https://github.com', icon: 'fab fa-github' },
  ];
}
