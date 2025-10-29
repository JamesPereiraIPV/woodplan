import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Concerto {
  date: Date;
  nome: string;
  local: string;
  hora: string;
}

@Component({
  selector: 'app-lineup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lineup.component.html',
  styleUrl: './lineup.component.css'
})
export class LineupComponent implements OnInit {
  dias: { data: Date; concertos: Concerto[] }[] = [];

  ngOnInit(): void {
    const hoje = new Date();

    // 🗓️ Gerar os próximos 30 dias
    for (let i = 0; i < 30; i++) {
      const dia = new Date(hoje);
      dia.setDate(hoje.getDate() + i);

      // 👉 Exemplo: podes mais tarde ligar a uma API ou a um array com concertos reais
      const concertosHoje: Concerto[] = [];

      // Apenas exemplo fictício
      if (i === 0) {
        concertosHoje.push({
          date: dia,
          nome: 'Bar Café 21',
          local: 'Murtede',
          hora: '23:00'
        });
      } else if (i === 3) {
        concertosHoje.push({
          date: dia,
          nome: 'The Garden',
          local: 'Estarreja',
          hora: '22:00'
        });
      }

      this.dias.push({ data: dia, concertos: concertosHoje });
    }
  }
}
