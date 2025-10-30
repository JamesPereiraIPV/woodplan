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

  ngOnInit(): void {
    // Adiciona dark mode ao html
    document.documentElement.classList.add('dark');
  }
}
