import { Component } from '@angular/core';
import {CurrencyService} from "../../../core/services/currency.service";
import {HttpClientModule} from "@angular/common/http";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {ChartModule} from "primeng/chart";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-convertisseur',
  standalone: true,
  imports: [HttpClientModule,
    ChartModule,
    DropdownModule,
    InputTextModule,
    ButtonModule, FormsModule,CommonModule
  ],
  templateUrl: './convertisseur.component.html',
  styleUrl: './convertisseur.component.css'
})
export class ConvertisseurComponent {
  currencies = [
    { label: 'Euro (EUR)', value: 'EUR', flag: 'eu' },
    { label: 'Dollar US (USD)', value: 'USD', flag: 'us' },
    { label: 'Livre Sterling (GBP)', value: 'GBP', flag: 'gb' },
    { label: 'Yen Japonais (JPY)', value: 'JPY', flag: 'jp' }
  ];

  fromCurrency: any;
  toCurrency: any;
  amount: number = 100;
  convertedAmount: number | null = null;

  currentRate: number | null = null;
  change: number | null = null;
  changePercent: number | null = null;

  chartData: any;
  chartOptions: any;

  constructor(private currencyService: CurrencyService) {}

  convert() {
    if (this.fromCurrency && this.toCurrency && this.amount > 0) {
      this.currencyService.convert(this.fromCurrency.value, this.toCurrency.value, this.amount).subscribe(data => {
        this.convertedAmount = +(data.result).toFixed(2);
        this.currentRate = +data.info.rate.toFixed(4);

        // Supposons que l'API retourne aussi le taux précédent (exemple fictif)
        const oldRate = this.currentRate - 0.001; // valeur factice pour illustration
        this.change = +(this.currentRate - oldRate).toFixed(4);
        this.changePercent = +((this.change / oldRate) * 100).toFixed(2);

        this.loadChart();
      });
    }
  }

  loadChart() {
    // Données factices, à remplacer par un appel API réel si tu veux plus tard
    this.chartData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [
        {
          label: 'Evolution',
          data: [105, 106, 107, 108.5, this.convertedAmount],
          fill: false,
          borderColor: '#A72887',
          tension: 0.3
        }
      ]
    };

    this.chartOptions = {
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { display: false },
        y: { display: false }
      },
      responsive: true,
      maintainAspectRatio: false
    };
  }
}
