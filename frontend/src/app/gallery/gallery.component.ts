import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent implements OnInit {

  videos: any[] = [];
  fotos: any[] = [];

  constructor(private http: HttpClient) {}

  fetchVideos() {
    this.http.get<any[]>('https://woodplan.onrender.com/videos').subscribe({
      next: (data) => {
        // Aqui você pode mapear os campos do seu backend para o frontend
        this.videos = data.map((video) => ({
          src: video.src, // ou video.url, dependendo do campo no banco
          title: video.title,
          thumbnail:
            video.thumbnail || '/images/woodplan-logo-nobackground.png',
        }));
      },
      error: (err) => console.error('Erro ao buscar vídeos', err),
    });
  }

  fetchFotos() {
    this.http.get<any[]>('https://woodplan.onrender.com/photos').subscribe({
      next: (data) => {
        // Mapear os campos do backend para os nomes que o template espera
        this.fotos = data.map((foto) => ({
          image: foto.image_url,
          alt: foto.alt_text, // corresponde ao [alt] no template
        }));
      },
      error: (err) => console.error('Erro ao buscar fotos', err),
    });
  }

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

  async downloadFileBrowser() {
    try {
      const url =
        this.modalType === 'photo'
          ? this.selectedItem.image
          : this.selectedItem.src;
      const filename =
        this.modalType === 'photo'
          ? this.selectedItem.alt + '.jpg'
          : this.selectedItem.title + '.mp4';

      // Baixa o arquivo como blob
      const response = await fetch(url);
      if (!response.ok) throw new Error('Erro ao baixar arquivo');
      const blob = await response.blob();

      // Cria link temporário para download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Libera memória
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Falha ao baixar arquivo:', error);
      alert('Não foi possível baixar o arquivo.');
    }
  }

  ngOnInit(): void {
    // Adiciona dark mode ao html
    document.documentElement.classList.add('dark');

    this.fetchVideos();
    this.fetchFotos();
  }
}
