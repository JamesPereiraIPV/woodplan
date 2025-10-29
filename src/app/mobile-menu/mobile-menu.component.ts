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
}
