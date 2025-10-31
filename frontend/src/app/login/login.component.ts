import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  error: string = '';
  currentYear = new Date().getFullYear();

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http
      .post<{ token: string }>('https://woodplan.onrender.com/auth/login', {
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/backoffice']);
        },
        error: () => {
          this.error = 'Credenciais inválidas. Tente novamente.';
        },
      });
  }

  ngOnInit(): void {
    // Adiciona dark mode ao html
    document.documentElement.classList.add('dark');
  }
}
