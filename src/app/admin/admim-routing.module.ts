import { Routes, RouterModule } from '@angular/router';
import { AdminDasboardComponent } from './admin-dasboard/admin-dasboard.component';
import { NgModule } from '@angular/core';
import { AdminUserComponent } from './admin-user/admin-user.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDasboardComponent,
  },
  {
    path: 'user',
    component: AdminDasboardComponent,
  },
  {
    path: 'dashboard',
    component: AdminDasboardComponent,
  },
  {
    path: 'order',
    component: AdminDasboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingodule {}
