import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategoryService } from 'src/service/category.service';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';
import { LoadingService } from 'src/service/loading.service';
import { ToastService } from 'src/service/toast.service';

@Component({
  selector: 'app-add-new-sub-category',
  templateUrl: './add-new-sub-category.component.html',
  styleUrls: ['./add-new-sub-category.component.scss']
})
export class AddNewSubCategoryComponent implements OnInit {
  subCategoryName: string = '';
  categoryId: any;

  constructor(private ref: DynamicDialogRef,
    private categoryService: CategoryService,
    private loadingService: LoadingService,
    private config: DynamicDialogConfig,
    private toastService: ToastService) {

    }
  ngOnInit(): void {
    if (this.config.data) {
      const data = this.config.data;
      this.categoryId = data?.category?.id;
    }
  }

  cancel() {
    this.ref.close(false);
  }

  create() {
    if (!this.subCategoryName) {
      return;
    }

    this.categoryService.createSubCategory(this.categoryId, this.subCategoryName).subscribe(
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
