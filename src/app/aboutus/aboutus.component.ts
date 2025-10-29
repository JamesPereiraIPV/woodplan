import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aboutus',
  imports: [CommonModule],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.css',
})
export class AboutusComponent {
  persons = [
    {
      name: 'James',
      cargo: 'Vocalista',
      description: 'Especialista em UI/UX.',
      image: '/images/band1.jpg',
      instagram: 'https://www.instagram.com/jamesteven_',
      whatsapp: 'https://wa.me/351'
    },
    {
      name: 'Ziig',
      cargo: 'Baixista',
      description: 'Full-stack com foco em Angular.',
      image: '/images/band2.jpg',
      instagram: 'https://www.instagram.com/ziig10',
      whatsapp: 'https://wa.me/351'
    },
    {
      name: 'João',
      cargo: 'Guitarrista',
      description: 'Organiza tudo com eficiência.',
      image: '/images/band3.jpg',
      instagram: 'https://www.instagram.com/joaohilario91',
      whatsapp: 'https://wa.me/351'
    },
    {
      name: 'Alex',
      cargo: 'Baterista',
      description: 'Garante qualidade em cada entrega.',
      image: '/images/band4.jpg',
      instagram: 'https://www.instagram.com/alex_cabral04',
      whatsapp: 'https://wa.me/351'
    },
    {
      name: 'Tone',
      cargo: 'Técnico de Som',
      description: 'Automatiza e monitora sistemas.',
      image: '/images/band5.jpg',
      instagram: 'https://www.instagram.com/ziig10',
      whatsapp: 'https://wa.me/351'
    },
  ];
}
