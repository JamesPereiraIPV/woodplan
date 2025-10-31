import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-promotional',
  imports: [FormsModule],
  templateUrl: './promotional.component.html',
  styleUrl: './promotional.component.css'
})
export class PromotionalComponent {
  mensagem: string = '';

  openWhatsApp(event: Event) {
    event.preventDefault();

    // Número do WhatsApp (inclua código do país)
    const numero = '351912345678'; 
    const mensagemEncode = encodeURIComponent(this.mensagem);

    const url = `https://wa.me/${numero}?text=${mensagemEncode}`;
    window.open(url, '_blank');
  }
}
