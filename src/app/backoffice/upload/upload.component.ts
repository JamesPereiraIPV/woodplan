import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpEventType } from '@angular/common/http';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  selectedPhotos: File[] = [];
  photoAlt: string = '';
  photoProgress: number = 0;

  constructor(private uploadService: UploadService) {}

  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedPhotos = Array.from(input.files);
    }
  }

  uploadPhoto() {
    if (this.selectedPhotos.length === 0) return;

    this.uploadService
      .uploadPhotos(this.selectedPhotos, this.photoAlt)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.photoProgress = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            alert('Fotos carregadas com sucesso!');
            this.photoProgress = 0;
            this.selectedPhotos = [];
          }
        },
        error: (err: any) => console.error('Erro ao enviar fotos:', err),
      });
  }

  selectedVideo?: File;
  videoTitle: string = '';
  videoThumbnail: string = '';
  videoProgress: number = 0;

  onVideoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedVideo = input.files[0];
    }
  }

  uploadVideo() {
    if (!this.selectedVideo) return;

    this.uploadService
      .uploadVideo(this.selectedVideo, this.videoTitle, this.videoThumbnail)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.videoProgress = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            alert('Vídeo carregado com sucesso!');
            this.videoProgress = 0;
          }
        },
        error: (err: any) => console.error('Erro ao enviar vídeo:', err),
      });
  }

  selectedCartaz?: File;
  cartazBarname: string = '';
  cartazDate: string = '';
  cartazLocation: string = '';
  cartazMapsLink: string = '';
  cartazProgress: number = 0;

  onCartazSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedCartaz = input.files[0];
      // input.value = '';
    }
  }

  uploadCartaz() {
    if (!this.selectedCartaz) return;

    // Converte para o formato que o MySQL aceita
    let formattedDate = this.cartazDate;
    if (formattedDate) {
      formattedDate = formattedDate.replace('T', ' '); // <--- espaço entre data e hora
      if (!formattedDate.includes(':')) {
        formattedDate += '00:00:00';
      } else if (formattedDate.length === 16) {
        formattedDate += ':00';
      }
    }

    this.uploadService
      .uploadCartaz(
        this.selectedCartaz,
        this.cartazBarname,
        formattedDate,
        this.cartazLocation,
        this.cartazMapsLink
      )
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.cartazProgress = Math.round(
              (event.loaded / event.total) * 100
            );
          } else if (event.type === HttpEventType.Response) {
            alert('Cartaz carregado com sucesso!');
            this.cartazProgress = 0;
            this.selectedCartaz = undefined;
            this.cartazBarname = '';
            this.cartazDate = '';
            this.cartazLocation = '';
            this.cartazMapsLink = '';
            const fileInput = document.querySelector<HTMLInputElement>(
              'input[name="cartazes"]'
            );
            if (fileInput) fileInput.value = '';
          }
        },
        error: (err: any) => console.error('Erro ao enviar cartaz:', err),
      });
  }

  ngOnInit(): void {
    // Adiciona dark mode ao html
    document.documentElement.classList.add('dark');
  }
}
