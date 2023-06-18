import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductCoreService } from 'src/app/service/product-core.service';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';
import { LoadingService } from 'src/service/loading.service';
import { ToastService } from 'src/service/toast.service';

@Component({
  selector: 'app-add-new-product-core',
  templateUrl: './add-new-product-core.component.html',
  styleUrls: ['./add-new-product-core.component.scss']
})
export class AddNewProductCoreComponent {
  name: string = '';

  constructor(
    private ref: DynamicDialogRef,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private productCoreService: ProductCoreService
  ) {}

  ngOnInit(): void {

  }

  cancel() {
    this.ref.close(false);
  }

  create() {
    if (!this.name) {
      return;
    }
    this.productCoreService.create(this.name).subscribe(
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
}
