import { Component } from '@angular/core';
import {CurrencyService} from "../../../core/services/currency.service";
import {HttpClientModule} from "@angular/common/http";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {ChartModule} from "primeng/chart";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {StyleClassModule} from "primeng/styleclass";

@Component({
  selector: 'app-convertisseur',
  standalone: true,
  imports: [HttpClientModule,
    ChartModule,
    DropdownModule,
    InputTextModule,
    ButtonModule, FormsModule,CommonModule,
    StyleClassModule
  ],
  templateUrl: './convertisseur.component.html',
  styleUrl: './convertisseur.component.css'
})
export class ConvertisseurComponent {
  currencies = [
    { label: 'Dinar Tunisien (TND)', value: 'TND', flag: 'tn' },
    { label: 'Riyal Saoudien (SAR)', value: 'SAR', flag: 'sa' },
    { label: 'Riyal Qatari (QAR)', value: 'QAR', flag: 'qa' },
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
        console.log("Réponse API convert:", data);

        this.convertedAmount = data.result ? +data.result.toFixed(2) : null;
        this.currentRate = data.info && data.info.quote ? +data.info.quote.toFixed(4) : null;


        // Supposons que l'API retourne aussi le taux précédent (exemple fictif)
        if (this.currentRate !== null) {
          const oldRate = this.currentRate - 0.001;
          this.change = +(this.currentRate - oldRate).toFixed(4);
          this.changePercent = +((this.change / oldRate) * 100).toFixed(2);
        } else {
          this.change = null;
          this.changePercent = null;
        }

        // this.currencyService.getHistoricalRates(this.fromCurrency.value, this.toCurrency.value)
        //   .subscribe((response:any) => {
        //     const rates = response.rates;
        //     const labels: string[] = [];
        //     const data: number[] = [];
        //
        //     for (let date in rates) {
        //       labels.push(date);
        //       data.push(rates[date][this.toCurrency.value]);
        //     }
        //
        //     this.chartData = {
        //       labels,
        //       datasets: [{
        //         label: `${this.fromCurrency.value} → ${this.toCurrency.value}`,
        //         data,
        //         fill: true,
        //         borderColor: '#3B82F6',
        //         backgroundColor: 'rgba(59, 130, 246, 0.2)',
        //         tension: 0.3
        //       }]
        //     };
        //
        //     this.chartOptions = {
        //       plugins: {
        //         legend: { display: true }
        //       },
        //       responsive: true,
        //       maintainAspectRatio: false
        //     };
        //   });
        //


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
