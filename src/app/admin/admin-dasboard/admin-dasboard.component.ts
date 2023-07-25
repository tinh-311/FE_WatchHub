import { Component, OnInit } from '@angular/core';
import { SIDE_NAV, SideNav } from './constant/admin.constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dasboard',
  templateUrl: './admin-dasboard.component.html',
  styleUrls: ['./admin-dasboard.component.scss'],
})
export class AdminDasboardComponent implements OnInit {
  readonly SIDE_NAV = SIDE_NAV;
  readonly SideNav = SideNav;

  curentNavItem: string = SideNav.Dashboard;

  constructor(private router: Router) {
    const currentUrl = this.router.url;
    const segments = currentUrl.split('/');
    const lastSegment = segments[segments.length - 1];

    switch (lastSegment) {
      case 'dashboard': {
        this.curentNavItem = SideNav.Dashboard;
        break;
      }
      case 'user': {
        this.curentNavItem = SideNav.Users;
        break;
      }
      case 'brands': {
        this.curentNavItem = SideNav.Brands;
        break;
      }
      case 'productGlass': {
        this.curentNavItem = SideNav.ProductGlass;
        break;
      }
      case 'categories': {
        this.curentNavItem = SideNav.Categories;
        break;
      }
      case 'productAlbert': {
        this.curentNavItem = SideNav.ProductAlbert;
        break;
      }
      case 'subcategories': {
        this.curentNavItem = SideNav.SubCategories;
        break;
      }
      case 'productTypes': {
        this.curentNavItem = SideNav.ProductTypes;
        break;
      }
      case 'productCores': {
        this.curentNavItem = SideNav.ProductCores;
        break;
      }
      case 'order': {
        this.curentNavItem = SideNav.Order;
        break;
      }
    }
  }

  ngOnInit(): void {}

  onClickNavItem(navItem: any) {
    this.curentNavItem = navItem?.name;
    let url = '';
    switch (this.curentNavItem) {
      case SideNav.Dashboard: {
        url = 'dashboard';
        break;
      }
      case SideNav.Users: {
        url = 'user';
        break;
      }
      case SideNav.Brands: {
        url = 'brands';
        break;
      }
      case SideNav.ProductAlbert: {
        url = 'productAlbert';
        break;
      }
      case SideNav.ProductGlass: {
        url = 'productGlass';
        break;
      }
      case SideNav.Categories: {
        url = 'categories';
        break;
      }
      case SideNav.SubCategories: {
        url = 'subcategories';
        break;
      }
      case SideNav.ProductTypes: {
        url = 'productTypes';
        break;
      }
      case SideNav.ProductCores: {
        url = 'productCores';
        break;
      }
      case SideNav.Order: {
        url = 'order';
        break;
      }
    }

    this.router.navigate([`/admin/${url}`]);
  }
}
