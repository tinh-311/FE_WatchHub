import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CategoryService } from 'src/service/category.service';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';
import { LoadingService } from 'src/service/loading.service';
import { ToastService } from 'src/service/toast.service';

@Component({
  selector: 'app-edit-sub-category',
  templateUrl: './edit-sub-category.component.html',
  styleUrls: ['./edit-sub-category.component.scss']
})
export class EditSubCategoryComponent implements OnInit {
  subCategoryName: string = '';
  subCategoryId: any;

  constructor(
    private ref: DynamicDialogRef,
    private categoryService: CategoryService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private config: DynamicDialogConfig
  ) {}
  ngOnInit(): void {
    if (this.config.data) {
      const data = this.config.data.subCategory;
      this.subCategoryName = data?.sub_category_name;
      this.subCategoryId = data?.id;
    }
  }

  cancel() {
    this.ref.close(false);
  }

  update() {
    if (!this.subCategoryName) {
      return;
    }

    this.categoryService
      .updateSubCategory(this.subCategoryId, this.subCategoryName)
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
