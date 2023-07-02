import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminGuard } from './guard/admin.guard';
import { VerifyComponent } from './verify/verify.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AuthenGuard } from './authen.guard';
import { MyOrderComponent } from './my-order/my-order.component';
import { ThankYouComponent } from './thank-you/thank-you.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'verify', component: VerifyComponent },
  { path: 'subcategory', component: SubCategoryComponent },
  { path: 'orders', component: MyOrderComponent },
  { path: 'thank-you', component: ThankYouComponent },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
    canActivate: [AuthenGuard],
  },
  { path: 'product-details', component: ProductDetailsComponent },
  {
    canActivate: [AdminGuard],
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((module) => module.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
