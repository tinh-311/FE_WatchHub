import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard-home',
  templateUrl: './admin-dashboard-home.component.html',
  styleUrls: ['./admin-dashboard-home.component.scss'],
})
export class AdminDashboardHomeComponent implements OnInit {
  productsCount: number;
  brandsCount: number;
  ordersCount: number;
  totalRevenue: number;
  revenueChartData: any;

  options: any;

  constructor() {
    // Khởi tạo dữ liệu thống kê
    this.productsCount = 150;
    this.brandsCount = 10;
    this.ordersCount = 50;
    this.totalRevenue = 100000000;

    // Khởi tạo dữ liệu biểu đồ doanh thu
    this.revenueChartData = {
      labels: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
      ],
      datasets: [
        {
          label: 'Năm nay',
          data: [65, 59, 80, 81, 56, 55, 40, 30, 20, 34, 47, 13],
        },
        {
          label: 'Năm trước',
          data: [28, 48, 40, 19, 86, 27, 90, 40, 19, 86, 27, 90],
        },
      ],
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {},
        },
      },
      scales: {
        x: {
          ticks: {
            font: {
              weight: 500,
            },
          },
          grid: {
            drawBorder: false,
          },
        },
        y: {
          ticks: {},
          grid: {
            drawBorder: false,
          },
        },
      },
    };
  }

  ngOnInit() {}
}
