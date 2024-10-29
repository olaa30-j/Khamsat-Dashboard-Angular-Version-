import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts',
  standalone: true,
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  chartId: string = '895caebf-a938-406b-be94-7b36323f3e43'; 
  embedUrl: string = 'hhttps://charts.mongodb.com/charts-khamsat-ftkkizr';

  constructor() { }

  ngOnInit(): void {
  }

  get iframeUrl(): string {
    return `${this.embedUrl}?chartId=${this.chartId}`;
  }
}
