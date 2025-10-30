import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { UploadComponent } from './backoffice/upload/upload.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'backoffice',
    component: UploadComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];
