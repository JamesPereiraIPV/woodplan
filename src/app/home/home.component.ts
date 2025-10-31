import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { HeadlinersComponent } from '../headliners/headliners.component';
import { MerchComponent } from '../merch/merch.component';
import { AboutusComponent } from '../aboutus/aboutus.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { PromotionalComponent } from '../promotional/promotional.component';
import { RouterModule } from '@angular/router';
import { CrewComponent } from '../crew/crew.component';
import { ReviewsComponent } from '../reviews/reviews.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NgClass,
    RouterModule,
    MobileMenuComponent,
    HeroSectionComponent,
    HeadlinersComponent,
    MerchComponent,
    AboutusComponent,
    ContactsComponent,
    PromotionalComponent,
    CrewComponent,
    ReviewsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  mobileMenuOpen = false;
  isDarkMode = false;

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  toggleDarkMode() {
    const html = document.documentElement;
    this.isDarkMode = html.classList.toggle('dark');
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
