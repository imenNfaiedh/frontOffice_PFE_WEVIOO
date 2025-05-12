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
export class DashboardComponent  {

  counts: any = {};
  constructor(private dashboardService : DashboardService) {
  }

  ngOnInit() {
    this.loadCounts();
  }

  loadCounts() {
    this.dashboardService.getUserCount().subscribe(data => this.counts.users = data);
    this.dashboardService.getBankCount().subscribe(data => this.counts.banks = data);
    this.dashboardService.getAccountCount().subscribe(data => this.counts.accounts = data);
    this.dashboardService.getTransactionCount().subscribe(data => this.counts.transactions = data);
  }
}
