import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingodule } from './admim-routing.module';
import { AdminDashboardHomeComponent } from './admin-dashboard-home/admin-dashboard-home.component';

@NgModule({
  declarations: [
    AdminDashboardHomeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingodule
  ]
})
export class AdminModule { }
