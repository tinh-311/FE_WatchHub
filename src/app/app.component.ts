import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'onlineBazaar';
  currentUrl: string = '';

  constructor(private location: Location) {}

  ngOnInit() {
    this.currentUrl = this.location.path();
  }
}
