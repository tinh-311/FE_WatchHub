import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductGlassService } from 'src/app/service/product-glass.service';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';
import { LoadingService } from 'src/service/loading.service';
import { ToastService } from 'src/service/toast.service';

@Component({
  selector: 'app-add-new-product-glass',
  templateUrl: './add-new-product-glass.component.html',
  styleUrls: ['./add-new-product-glass.component.scss']
})
export class AddNewProductGlassComponent {
  name: string = '';

  constructor(
    private ref: DynamicDialogRef,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private productGlassService: ProductGlassService
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
    this.productGlassService.create(this.name).subscribe(
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
