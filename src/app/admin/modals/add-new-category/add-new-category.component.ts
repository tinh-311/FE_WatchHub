import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategoryService } from 'src/service/category.service';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';
import { LoadingService } from 'src/service/loading.service';
import { ToastService } from 'src/service/toast.service';

@Component({
  selector: 'app-add-new-category',
  templateUrl: './add-new-category.component.html',
  styleUrls: ['./add-new-category.component.scss'],
})
export class AddNewCategoryComponent {
  categoryName: string = '';

  constructor(
    private ref: DynamicDialogRef,
    private categoryService: CategoryService,
    private loadingService: LoadingService,
    private toastService: ToastService
  ) {}

  cancel() {
    this.ref.close(false);
  }

  create() {
    if (!this.categoryName) {
      return;
    }

    this.categoryService.createCategory(this.categoryName).subscribe(
      (res) => {
        if (res?.message === 'Category creation successful') {
          this.toastService.showMessage(
            ToasSumary.Success,
            res?.message,
            ToastType.Success
          );

          this.ref.close(true);
        }
      },
      (err) => {
        if (err?.error?.message.includes('is already existed in system')) {
          this.toastService.showMessage(
            ToasSumary.Error,
            `Danh mục ${this.categoryName} đã tồn tại!`,
            ToastType.Error
          );
        }
        this.ref.close(false);
      }
    );
  }
}
