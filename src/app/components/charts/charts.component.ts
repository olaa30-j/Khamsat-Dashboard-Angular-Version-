import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  chartId: string = '895caebf-a938-406b-be94-7b36323f3e43'; 
  embedUrl: string = 'https://charts.mongodb.com/charts-khamsat-ftkkizr';
  loading: boolean = true;
  error: boolean = false;

  constructor() {}

  ngOnInit(): void {}


  get iframeUrl(): string {
    let cachedUrl = sessionStorage.getItem('iframeUrl');
    if (cachedUrl) {
      console.log("URL retrieved from sessionStorage:", cachedUrl);
      return cachedUrl;
    } else {
      cachedUrl = `${this.embedUrl}?id=${this.chartId}&theme=light&autoRefresh=true`;
      sessionStorage.setItem('iframeUrl', cachedUrl);
      console.log("URL stored in sessionStorage:", cachedUrl);
      return cachedUrl;
    }
  }
}
