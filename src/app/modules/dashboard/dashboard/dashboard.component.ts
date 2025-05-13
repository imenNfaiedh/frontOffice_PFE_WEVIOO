import {Component, OnInit} from '@angular/core';
import {ChartModule} from "primeng/chart";
import {CardModule} from "primeng/card";
import {CommonModule} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DashboardService} from "../../../core/services/dashboard.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartModule, CardModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent   {

  counts: any = {};

  chartData: any;
  chartOptions: any;
  constructor(private dashboardService : DashboardService) {
  }

  ngOnInit() {
    this.loadCounts();
    this.loadDashboardStats();
    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          enabled: true
        }
      }
    };


  }
  // pour les card
  loadCounts() {
    this.dashboardService.getUserCount().subscribe(data => this.counts.users = data);
    this.dashboardService.getBankCount().subscribe(data => this.counts.banks = data);
    this.dashboardService.getAccountCount().subscribe(data => this.counts.accounts = data);
    this.dashboardService.getTransactionCount().subscribe(data => this.counts.transactions = data);
  }

  loadDashboardStats() {
    this.dashboardService.getStats().subscribe(data => {
      this.counts = data;

      this.chartData = {
        labels: ['Users', 'Banks', 'Accounts', 'Transactions'],
        datasets: [
          {
            data: [
              data.users,
              data.banks,
              data.accounts,
              data.transactions,

            ],
            backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#9c27b0', '#f44336'],
            hoverBackgroundColor: ['#66bb6a', '#42a5f5', '#ffb74d', '#ba68c8', '#ef5350']
          }
        ]
      };
    });
  }

}
