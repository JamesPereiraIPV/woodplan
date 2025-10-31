import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CartazesService, Cartaz as CartazRaw } from './headliners.service';

interface Cartaz extends Omit<CartazRaw, 'date'> {
  date: Date;
}

@Component({
  selector: 'app-headliners',
  standalone: true,
  imports: [CommonModule, DatePipe, HttpClientModule],
  templateUrl: './headliners.component.html',
  styleUrl: './headliners.component.css',
})
export class HeadlinersComponent implements OnInit {
  @ViewChild('carousel', { static: false })
  carousel!: ElementRef<HTMLDivElement>;

  cartazes: Cartaz[] = [];

  bounceLeft = false;
  bounceRight = false;

  constructor(private cartazesService: CartazesService) {}

  ngOnInit() {
    this.cartazesService.getCartazes().subscribe({
      next: (data) => {
        const hoje = new Date();

        this.cartazes = data
          // converter string -> Date
          .map((c) => ({
            ...c,
            date: new Date(c.date),
            image: this.formatImageUrl(c.image),
          }))
          // filtrar eventos futuros
          .filter((c) => c.date >= hoje)
          // ordenar por data
          .sort((a, b) => a.date.getTime() - b.date.getTime());
      },
      error: (err) => {
        console.error('Erro ao carregar cartazes:', err);
      },
    });
  }

  /** Corrige a URL da imagem (acrescenta domínio) */
  private formatImageUrl(relativePath: string): string {
    if (relativePath.startsWith('http')) return relativePath;
    return `https://woodplan.onrender.com${relativePath}`;
  }

  // --- Carousel Controls ---
  scrollCarousel(direction: 'left' | 'right') {
    const carouselEl = this.carousel.nativeElement;
    const itemWidth = carouselEl.querySelector('div')?.clientWidth || 300;
    carouselEl.scrollLeft += direction === 'right' ? itemWidth : -itemWidth;
  }

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

  // --- Drag Scroll ---
  isDraggin = false;
  startX = 0;
  scrollLeft = 0;

  ngAfterViewInit() {
    const carouselEl = this.carousel.nativeElement;

    carouselEl.addEventListener('mousedown', (e) => {
      this.isDraggin = true;
      this.startX = e.pageX - carouselEl.offsetLeft;
      this.scrollLeft = carouselEl.scrollLeft;
      carouselEl.classList.add('cursor-grabbing');
    });

    carouselEl.addEventListener('mouseleave', () => {
      this.isDraggin = false;
      carouselEl.classList.remove('cursor-grabbing');
    });

    carouselEl.addEventListener('mouseup', () => {
      this.isDraggin = false;
      carouselEl.classList.remove('cursor-grabbing');
    });

    carouselEl.addEventListener('mousemove', (e) => {
      if (!this.isDraggin) return;
      e.preventDefault();
      const x = e.pageX - carouselEl.offsetLeft;
      const walk = (x - this.startX) * 1.5;
      carouselEl.scrollLeft = this.scrollLeft - walk;
    });
  }
}
