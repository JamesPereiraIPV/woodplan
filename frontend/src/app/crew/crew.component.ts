import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crew',
  imports: [CommonModule],
  templateUrl: './crew.component.html',
  styleUrl: './crew.component.css',
})
export class CrewComponent {
  persons = [
    {
      name: 'Pestana',
      cargo: 'Videógrafo',
      description: 'A minha voz é como Wi-Fi: às vezes falha, mas todos reclamam',
      image: 'https://estgv-my.sharepoint.com/personal/pv24626_alunos_estgv_ipv_pt/Documents/Woodplan/Fotos/Pestana.jpg?ga=1',
      instagram: 'https://www.instagram.com/tiagopestana98',
    },
    {
      name: 'Livi',
      cargo: 'Fotógrafo',
      description: 'A minha voz é como Wi-Fi: às vezes falha, mas todos reclamam',
      image: 'https://estgv-my.sharepoint.com/personal/pv24626_alunos_estgv_ipv_pt/Documents/Woodplan/Fotos/James.jpg?ga=1',
      instagram: 'https://www.instagram.com/photo.by.livi',
    },
  ];
}
