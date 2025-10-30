import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { UploadComponent } from './backoffice/upload/upload.component'

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'backoffice', component: UploadComponent},
  { path: '**', redirectTo: '' },
];
