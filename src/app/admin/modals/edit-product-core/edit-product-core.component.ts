import { Component } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ProductCoreService } from 'src/app/service/product-core.service';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';
import { LoadingService } from 'src/service/loading.service';
import { ToastService } from 'src/service/toast.service';

@Component({
  selector: 'app-edit-product-core',
  templateUrl: './edit-product-core.component.html',
  styleUrls: ['./edit-product-core.component.scss']
})
export class EditProductCoreComponent {
  name: string = '';
  id: any = '';

  constructor(
    private ref: DynamicDialogRef,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private config: DynamicDialogConfig,
    private productCoreService: ProductCoreService
  ) {}
  ngOnInit(): void {
    if (this.config.data) {
      const data = this.config.data.data;
      this.name = data?.core_name;
      this.id = data?.id;
    }
  }

  cancel() {
    this.ref.close(false);
  }

  update() {
    if (!this.name) {
      return;
    }

    this.productCoreService
      .update(this.id, this.name)
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
          this.toastService.showMessage(
            ToasSumary.Error,
            err?.error?.message,
            ToastType.Error
          );
          this.ref.close(false);
        }
      );
  }
}
