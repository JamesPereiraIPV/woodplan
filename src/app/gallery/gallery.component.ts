import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent implements OnInit {
  fotos = [
    {
      image:
        'https://estgv-my.sharepoint.com/personal/pv24626_alunos_estgv_ipv_pt/Documents/Woodplan/Fotos/IMG-20251020-WA0024.jpg?ga=1',
      alt: 'Concerto 1',
    },
    {
      image:
        'https://estgv-my.sharepoint.com/personal/pv24626_alunos_estgv_ipv_pt/Documents/Woodplan/Fotos/IMG-20251020-WA0035.jpg?ga=1',
      alt: 'Concerto 2',
    },
    {
      image:
        'https://estgv-my.sharepoint.com/personal/pv24626_alunos_estgv_ipv_pt/Documents/Woodplan/Fotos/IMG-20251020-WA0056.jpg?ga=1',
      alt: 'Backstage',
    },
    {
      image:
        'https://estgv-my.sharepoint.com/personal/pv24626_alunos_estgv_ipv_pt/Documents/Woodplan/Fotos/IMG-20251020-WA0025.jpg?ga=1',
      alt: 'Festival',
    },
    {
      image:
        'https://estgv-my.sharepoint.com/personal/pv24626_alunos_estgv_ipv_pt/Documents/Woodplan/Fotos/IMG-20251020-WA0040.jpg?ga=1',
      alt: 'Ensaio',
    },
    {
      image:
        'https://estgv-my.sharepoint.com/personal/pv24626_alunos_estgv_ipv_pt/Documents/Woodplan/Fotos/IMG-20251020-WA0065.jpg?ga=1',
      alt: 'Estúdio',
    },
    {
      image:
        'https://estgv-my.sharepoint.com/personal/pv24626_alunos_estgv_ipv_pt/Documents/Woodplan/Fotos/IMG-20251020-WA0029.jpg?ga=1',
      alt: 'Palco',
    },
    {
      image:
        'https://estgv-my.sharepoint.com/personal/pv24626_alunos_estgv_ipv_pt/Documents/Woodplan/Fotos/IMG-20251020-WA0038.jpg?ga=1',
      alt: 'Público',
    },
    {
      image:
        'https://estgv-my.sharepoint.com/personal/pv24626_alunos_estgv_ipv_pt/Documents/Woodplan/Fotos/IMG-20251020-WA0031.jpg?ga=1',
      alt: 'Concerto Final',
    },
    {
      image:
        'https://estgv-my.sharepoint.com/personal/pv24626_alunos_estgv_ipv_pt/Documents/Woodplan/Fotos/IMG-20251020-WA0023.jpg?ga=1',
      alt: 'Tour',
    },
  ];

  videos = [
    {
      src: 'https://estgv-my.sharepoint.com/personal/pv24626_alunos_estgv_ipv_pt/Documents/Woodplan/Promocional/Promotional.mp4?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&ga=1',
      title: 'Promotional',
      thumbnail: '/images/woodplan-logo-nobackground.png',
    },
  ];

  // Páginação
  fotosPerPage = 8;
  videosPerPage = 3;
  currentPhotoPage = 1;
  currentVideoPage = 1;

  // Modal
  selectedItem: any = null;
  modalType: 'photo' | 'video' | null = null;

  // Paginação

  get paginatedFotos() {
    const start = (this.currentPhotoPage - 1) * this.fotosPerPage;
    return this.fotos.slice(start, start + this.fotosPerPage);
  }

  get totalPhotoPages() {
    return Math.ceil(this.fotos.length / this.fotosPerPage);
  }

  get paginatedVideos() {
    const start = (this.currentVideoPage - 1) * this.videosPerPage;
    return this.videos.slice(start, start + this.videosPerPage);
  }

  get totalVideoPages() {
    return Math.ceil(this.videos.length / this.videosPerPage);
  }

  openModal(item: any, type: 'photo' | 'video') {
    this.selectedItem = item;
    this.modalType = type;
  }

  closeModal() {
    this.selectedItem = null;
    this.modalType = null;
  }

  downloadFileBrowser() {
    const url =
      this.modalType === 'photo'
        ? this.selectedItem.image
        : this.selectedItem.src;
    const filename =
      this.modalType === 'photo'
        ? this.selectedItem.alt + '.jpg'
        : this.selectedItem.title + '.mp4';

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  ngOnInit(): void {
    // Adiciona dark mode ao html
    document.documentElement.classList.add('dark');
  }
}
