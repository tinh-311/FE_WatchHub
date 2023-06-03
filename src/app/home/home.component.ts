import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CategoryService } from 'src/service/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  banners: any;
  responsiveOptions: any;


  constructor(private router: Router) {}

  ngOnInit() {
    this.banners = [
      'https://cdn3.dhht.vn/wp-content/uploads/2019/02/dong-ho-nam-banner.jpg',
      'https://cdn3.dhht.vn/wp-content/uploads/2019/02/dong-ho-nu-1.jpg',
      'https://cdn3.dhht.vn/wp-content/uploads/2019/03/banner-doi.jpg',
      'https://cdn3.dhht.vn/wp-content/uploads/2019/03/G-shock.jpg',
      'https://cdn3.dhht.vn/wp-content/uploads/2019/02/banner-CITIZEN.jpg',
    ];

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}
