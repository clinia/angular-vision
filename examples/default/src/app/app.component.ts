import { Component, AfterViewInit } from '@angular/core';
import clinia from 'clinia/lite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
  config = {
    searchClient: clinia('demo-pharmacies', 'KcLxBhVFP8ooPgQODlAxWqfNg657fTz9'),
    indexName: 'health_facility',
    routing: true,
  };
  resultsContainer = undefined;
  header = undefined;

  ngAfterViewInit() {
    this.resultsContainer = document.querySelector('.container-results');
    this.header = document.querySelector('#header');
  }
}
