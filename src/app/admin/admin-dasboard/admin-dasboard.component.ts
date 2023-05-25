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

  constructor(private router: Router) {}

  ngOnInit(): void {
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
      case 'order': {
        this.curentNavItem = SideNav.Order;
        break;
      }
      case 'profile': {
        this.curentNavItem = SideNav.Profile;
        break;
      }
    }
  }

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
      case SideNav.Order: {
        url = 'order';
        break;
      }
      case SideNav.Profile: {
        url = 'profile';
        break;
      }
    }

    this.router.navigate([`/admin/${url}`]);
  }
}
