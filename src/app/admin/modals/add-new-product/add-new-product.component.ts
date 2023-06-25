import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductCoreService } from 'src/app/service/product-core.service';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';
import { LoadingService } from 'src/service/loading.service';
import { ProductsService } from 'src/service/products.service';
import { ToastService } from 'src/service/toast.service';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss'],
})
export class AddNewProductComponent implements OnInit {
  ma: string = '';
  productTypeId: any;

  constructor(
    private ref: DynamicDialogRef,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private productService: ProductsService,
    private config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    if (this.config.data) {
      const data = this.config.data;
      this.productTypeId = data?.productTypeId;
    }
  }

  cancel() {
    this.ref.close(false);
  }

  create() {
    if (!this.ma) {
      return;
    }
    this.productService
      .createProduct({
        product_type_id: this.productTypeId,
        product_code: this.ma,
      })
      .subscribe(
        (res) => {
          if (res?.message) {
            this.toastService.showMessage(
              ToasSumary.Success,
              res?.message,
              ToastType.Success
            );
            this.ref.close(true);
          }
        },
        (err) => {
          if (err?.error?.message) {
            this.toastService.showMessage(
              ToasSumary.Error,
              err?.error?.message,
              ToastType.Error
            );
          }
          this.ref.close(false);
        }
      );
  }

  generateProductCode(): string {
    const uuid = uuidv4().toUpperCase();
    const currentDateTime = moment().format('YYYYMMDDHHmmss');
    const code = `${uuid.substr(0, 3)}-${uuid.substr(9, 4)}-${currentDateTime}`;
    return code;
  }

  autoGenerateCode() {
    this.ma = this.generateProductCode();
  }
}
