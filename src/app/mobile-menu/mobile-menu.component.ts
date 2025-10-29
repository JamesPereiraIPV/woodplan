import { Component, Input } from '@angular/core';
import { NgIf} from '@angular/common';

@Component({
  selector: 'app-mobile-menu',
  imports: [NgIf],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.css'
})
export class MobileMenuComponent {
  @Input() isOpen = false;

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start'});
    }
  }
}

