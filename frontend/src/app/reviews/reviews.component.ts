import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css',
})
export class ReviewsComponent implements OnInit {
  @ViewChild('carousel', { static: false })
  carousel!: ElementRef<HTMLDivElement>;

  // Lista de reviews
  reviews = [
    {
      name: 'Diogo Piçarra',
      photo: 'https://i.pravatar.cc/150?img=12',
      review:
        'Grande Abraça meninos, adorei ouvir-vos. Parabéns!',
      date: new Date(2025, 9, 20),
    },
    {
      name: 'Mónia Borges',
      photo: 'https://i.pravatar.cc/150?img=5',
      review:
        'Eu adorei! Nunca me tinha dado tanta pica cantar guns',
      date: new Date(2025, 9, 25),
    },
    {
      name: 'Ricardo Lopes',
      photo: 'https://i.pravatar.cc/150?img=8',
      review:
        'Melhor banda de Viseu e Arredores!',
      date: new Date(2025, 9, 30),
    },
    {
      name: 'Sara Duarte',
      photo: 'https://i.pravatar.cc/150?img=20',
      review:
        'Adorei o concerto, mas o som podia estar um pouco mais equilibrado.',
      date: new Date(2025, 10, 1),
    },
  ];

  // --- Lógica do carousel ---
  bounceLeft = false;
  bounceRight = false;

  handleClick(direction: 'left' | 'right') {
    this.scrollCarousel(direction);
    if (direction === 'left') {
      this.bounceLeft = true;
      setTimeout(() => (this.bounceLeft = false), 300);
    } else {
      this.bounceRight = true;
      setTimeout(() => (this.bounceRight = false), 300);
    }
  }

  scrollCarousel(direction: 'left' | 'right') {
    const carouselEl = this.carousel.nativeElement;
    const itemWidth = carouselEl.querySelector('div')?.clientWidth || 300;
    carouselEl.scrollLeft += direction === 'right' ? itemWidth : -itemWidth;
  }

  // --- Drag Scroll ---
  isDragging = false;
  startX = 0;
  scrollLeft = 0;

  ngAfterViewInit() {
    const carouselEl = this.carousel.nativeElement;

    carouselEl.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.startX = e.pageX - carouselEl.offsetLeft;
      this.scrollLeft = carouselEl.scrollLeft;
      carouselEl.classList.add('cursor-grabbing');
    });

    carouselEl.addEventListener('mouseleave', () => {
      this.isDragging = false;
      carouselEl.classList.remove('cursor-grabbing');
    });

    carouselEl.addEventListener('mouseup', () => {
      this.isDragging = false;
      carouselEl.classList.remove('cursor-grabbing');
    });

    carouselEl.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      e.preventDefault();
      const x = e.pageX - carouselEl.offsetLeft;
      const walk = (x - this.startX) * 1.5;
      carouselEl.scrollLeft = this.scrollLeft - walk;
    });
  }

  ngOnInit() {
    // Ordenar reviews mais recentes primeiro
    this.reviews.sort((a, b) => b.date.getTime() - a.date.getTime());
  }
}