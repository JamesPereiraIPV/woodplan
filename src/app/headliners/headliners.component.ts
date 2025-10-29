import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-headliners',
  imports: [CommonModule],
  templateUrl: './headliners.component.html',
  styleUrl: './headliners.component.css',
})
export class HeadlinersComponent {
  @ViewChild('carousel', { static: false })
  carousel!: ElementRef<HTMLDivElement>;

  bands = [
    {
      image: '/images/band1.jpg',
      name: 'Corduray Gary',
      details: '1st July 9pm - Main Stage',
    },
    {
      image: '/images/band2.jpg',
      name: 'Corduray Gary',
      details: '2nd July 9pm - Main Stage',
    },
    {
      image: '/images/band3.jpg',
      name: 'Corduray Gary',
      details: '3rd July 9pm - Main Stage',
    },
    {
      image: '/images/band4.jpg',
      name: 'Corduray Gary',
      details: '4th July 9pm - Main Stage',
    },
    {
      image: '/images/band5.jpg',
      name: 'Corduray Gary',
      details: '5th July 9pm - Main Stage',
    },
    {
      image: '/images/band6.jpg',
      name: 'Corduray Gary',
      details: '6th July 9pm - Main Stage',
    },
    {
      image: '/images/band7.jpg',
      name: 'Corduray Gary',
      details: '7th July 9pm - Main Stage',
    },
  ];

  scrollCarousel(direction: 'left' | 'right') {
    const carouselEl = this.carousel.nativeElement;
    const itemWidth = carouselEl.querySelector('div')?.clientWidth || 300;
    carouselEl.scrollLeft += direction === 'right' ? itemWidth : -itemWidth;
  }

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
