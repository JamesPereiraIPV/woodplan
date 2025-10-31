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
      description: 'A minha voz é como Wi-Fi: às vezes falha, mas todos reclamam',
      image: 'https://estgv-my.sharepoint.com/personal/pv24626_alunos_estgv_ipv_pt/Documents/Woodplan/Fotos/James.jpg?ga=1',
      instagram: 'https://www.instagram.com/jamesteven_',
      whatsapp: 'https://wa.me/351'
    },
    {
      name: 'Ziig',
      cargo: 'Baixista',
      description: 'Full-stack com foco em Angular.',
      image: 'https://estgv-my.sharepoint.com/personal/pv24626_alunos_estgv_ipv_pt/Documents/Woodplan/Fotos/Ziig.jpg?ga=1',
      instagram: 'https://www.instagram.com/ziig10',
      whatsapp: 'https://wa.me/351'
    },
    {
      name: 'João',
      cargo: 'Guitarrista',
      description: 'A culpa é sempre do guitarrista',
      image: 'https://estgv-my.sharepoint.com/personal/pv24626_alunos_estgv_ipv_pt/Documents/Woodplan/Fotos/Joao.jpg?ga=1',
      instagram: 'https://www.instagram.com/joaohilario91',
      whatsapp: 'https://wa.me/351'
    },
    {
      name: 'Alex',
      cargo: 'Baterista',
      description: 'Garante qualidade em cada entrega.',
      image: 'https://estgv-my.sharepoint.com/personal/pv24626_alunos_estgv_ipv_pt/Documents/Woodplan/Fotos/Alex.jpg?ga=1',
      instagram: 'https://www.instagram.com/alex_cabral04',
      whatsapp: 'https://wa.me/351'
    },
    {
      name: 'Tone',
      cargo: 'Técnico de Som',
      description: 'Se não me vês, é porque estou a salvar o concerto',
      image: '/images/band5.jpg',
      instagram: 'https://www.instagram.com/ziig10',
      whatsapp: 'https://wa.me/351'
    },
  ];
}
