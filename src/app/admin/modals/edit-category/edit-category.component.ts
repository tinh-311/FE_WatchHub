import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategoryService } from 'src/service/category.service';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';
import { LoadingService } from 'src/service/loading.service';
import { ToastService } from 'src/service/toast.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  categoryName: string = '';
  categoryId: any;

  constructor(
    private ref: DynamicDialogRef,
    private categoryService: CategoryService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private config: DynamicDialogConfig
  ) {}
  ngOnInit(): void {
    if (this.config.data) {
      const data = this.config.data.category;
      this.categoryName = data?.category_name;
      this.categoryId = data?.id;
    }
  }

  cancel() {
    this.ref.close();
  }

  update() {
    if (!this.categoryName) {
      return;
    }

    this.categoryService.updateCategory(this.categoryId, this.categoryName).subscribe(
      (res) => {
        if (res?.message === 'Category update successful') {
          this.toastService.showMessage(
            ToasSumary.Success,
            res?.message,
            ToastType.Success
          );

          this.ref.close();
        }
      },
      () => {}
    );
  }
}
