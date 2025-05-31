import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { BaseChartDirective } from 'ng2-charts';
import { PetsService } from '../../core/services/pets.service';
import { ChartData, ChartOptions } from 'chart.js';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    BaseChartDirective,
  ],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.scss',
})
export class PetsComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [],
  };
  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };

  displayedColumns: string[] = ['date', 'animal', 'price'];
  dailySales: any[] = [];

  constructor(private petsService: PetsService) {}

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];
    this.loadWeeklySales(today);
    this.loadDailySales(today);
  }

  loadWeeklySales(date: string) {
    this.petsService.getWeeklySales(date).subscribe((data) => {
      this.lineChartData.labels = data.categories;

      this.lineChartData.datasets = data.series.map((seriesItem: any) => ({
        label: seriesItem.name,
        data: seriesItem.data,
        tension: 0.25,
        borderColor: this.getRandomColor(),
      }));
      this.chart?.update();
    });
  }

  loadDailySales(date: string) {
    this.petsService.getDailySales(date).subscribe((data) => {
      this.dailySales = data;
    });
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
