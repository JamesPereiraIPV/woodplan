import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { HeadlinersComponent } from './headliners/headliners.component';
import { MerchComponent } from './merch/merch.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactsComponent } from './contacts/contacts.component';
import { PromotionalComponent } from './promotional/promotional.component';

@Component({
  selector: 'app-root',
  imports: [
    NgClass,
    CommonModule,
    MobileMenuComponent,
    HeroSectionComponent,
    HeadlinersComponent,
    MerchComponent,
    AboutusComponent,
    ContactsComponent,
    PromotionalComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'band-project';
  mobileMenuOpen = false;
  darkModeToggle = false;

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  isDarkMode = false;

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
      element.scrollIntoView({ behavior: 'smooth', block: 'start'});
    }
  }
}
