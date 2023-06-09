import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingodule } from './admim-routing.module';
import { EditCategoryComponent } from './modals/edit-category/edit-category.component';
import { ProductTypesComponent } from './product-types/product-types.component';
import { BrandsComponent } from './brands/brands.component';
import { AddNewBrandComponent } from './modals/add-new-brand/add-new-brand.component';
import { EditBrandComponent } from './modals/edit-brand/edit-brand.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AdminRoutingodule
  ]
})
export class AdminModule { }
