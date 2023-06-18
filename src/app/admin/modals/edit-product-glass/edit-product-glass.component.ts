import { Component } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ProductGlassService } from 'src/app/service/product-glass.service';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';
import { LoadingService } from 'src/service/loading.service';
import { ToastService } from 'src/service/toast.service';

@Component({
  selector: 'app-edit-product-glass',
  templateUrl: './edit-product-glass.component.html',
  styleUrls: ['./edit-product-glass.component.scss']
})
export class EditProductGlassComponent {
  name: string = '';
  id: any = '';

  constructor(
    private ref: DynamicDialogRef,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private config: DynamicDialogConfig,
    private productGlassService: ProductGlassService
  ) {}
  ngOnInit(): void {
    if (this.config.data) {
      const data = this.config.data.data;
      this.name = data?.glass_name;
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

    this.productGlassService
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
