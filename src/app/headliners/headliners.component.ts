import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-headliners',
  imports: [CommonModule, DatePipe],
  templateUrl: './headliners.component.html',
  styleUrl: './headliners.component.css',
})
export class HeadlinersComponent implements OnInit {
  @ViewChild('carousel', { static: false })
  carousel!: ElementRef<HTMLDivElement>;

  cartazes = [
    {
      image:
        'https://estgv-my.sharepoint.com/personal/pv24626_alunos_estgv_ipv_pt/Documents/Woodplan/Cartazes/Bar21.png?ga=1',
      barname: 'Bar Café 21',
      date: new Date(2025, 9, 18, 22, 0),
      location: 'Largo Principal, Murtede',
      mapsLink: 'https://www.google.com/maps?q=Bar+Café+21,+Viseu',
    },
    {
      image:
        'https://estgv-my.sharepoint.com/personal/pv24626_alunos_estgv_ipv_pt/Documents/Woodplan/Cartazes/HardBar.png?ga=1',
      barname: 'HardBar',
      date: new Date(2025, 9, 31, 23, 0),
      location: 'Largo 31 Agosto, Gafanha da Nazaré',
      mapsLink: 'https://www.google.com/maps?q=Main+Stage,+Porto',
    },
    {
      image:
        'https://estgv-my.sharepoint.com/personal/pv24626_alunos_estgv_ipv_pt/Documents/Woodplan/Cartazes/TheBrothers.png?ga=1',
      barname: 'The Brothers',
      date: new Date(2025, 9, 25, 23, 0),
      location: 'Rua da Paz, Viseu',
      mapsLink: 'https://maps.app.goo.gl/NYnAWZL33Sk1JGMX6',
    },
    {
      image:
        'https://estgv-my.sharepoint.com/personal/pv24626_alunos_estgv_ipv_pt/Documents/Woodplan/Cartazes/TheGarden.png?ga=1',
      barname: 'The Garden',
      date: new Date(2025, 10, 1, 22, 0),
      location: 'Av. Visc. De Salreu, Estarreja',
      mapsLink: 'https://www.google.com/maps?q=Main+Stage,+Lisboa',
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

  ngOnInit() {
    const hoje = new Date();

    this.cartazes = this.cartazes
      // filtra apenas os eventos que ainda vão acontecer (hoje ou no futuro)
      .filter((c) => c.date >= hoje)
      // ordena pela data (mais próxima primeiro)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }
}
