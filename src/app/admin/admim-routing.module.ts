import { Routes, RouterModule } from '@angular/router';
import { AdminDasboardComponent } from './admin-dasboard/admin-dasboard.component';
import { NgModule } from '@angular/core';

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
    path: 'categories',
    component: AdminDasboardComponent,
  },
  {
    path: 'brands',
    component: AdminDasboardComponent,
  },
  {
    path: 'subcategories',
    component: AdminDasboardComponent,
  },
  {
    path: 'productAlbert',
    component: AdminDasboardComponent,
  },
  {
    path: 'productCores',
    component: AdminDasboardComponent,
  },
  {
    path: 'productGlass',
    component: AdminDasboardComponent,
  },
  {
    path: 'dashboard',
    component: AdminDasboardComponent,
  },
  {
    path: 'productTypes',
    component: AdminDasboardComponent,
  },
  {
    path: 'order',
    component: AdminDasboardComponent,
  },
  {
    path: 'profile',
    component: AdminDasboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingodule {}
