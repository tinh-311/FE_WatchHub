import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { CategoryService } from 'src/service/category.service';
import { ConfirmationComponent } from '../modals/confirmation/confirmation.component';
import { AddNewSubCategoryComponent } from '../modals/add-new-sub-category/add-new-sub-category.component';
import { ToastService } from 'src/service/toast.service';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';
import { EditSubCategoryComponent } from '../modals/edit-sub-category/edit-sub-category.component';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.scss'],
})
export class SubcategoriesComponent implements OnInit {
  categories: any = [];
  subCategories: any = [];
  selectedCategory: any;

  currentPage: any = 1;
  rowsPerPage: any = 5;
  totalCount: number = 0;
  isLoading: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private dialogService: DialogService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((data) => {
      this.categories = data.res;
      this.selectedCategory = this.categories[0];
      this.getSubCategories();
    });
  }

  onPageChanged(event: any) {
    this.currentPage = event.page + 1;
    this.rowsPerPage = event.rows;
    this.getSubCategories();
  }

  onDropdownChange(event: any) {
    this.selectedCategory = event?.value;
    this.getSubCategories();
  }

  getSubCategories() {
    this.isLoading = true;
    this.categoryService
      .getAllSubCategories(
        this.selectedCategory.id,
        this.currentPage,
        this.rowsPerPage
      )
      .subscribe((data) => {
        console.log('🏍️ ~ data: ', data);
        this.totalCount = data?.totalCount;
        console.log('🏍️ ~ this.totalCount: ', this.totalCount);
        this.subCategories = data?.res;
        this.isLoading = false;
      });
  }

  editSubCategory(subCategory: any) {
    const ref = this.dialogService.open(EditSubCategoryComponent, {
      header: 'Cập Nhật Danh Mục',
      width: '70%',
      dismissableMask: true,
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
      data: { subCategory: subCategory },
    });

    ref.onClose.subscribe((data) => {
      if (data) {
        this.getSubCategories();
      }
    });
  }

  deleteSubCategory(data: any) {
    const ref = this.dialogService.open(ConfirmationComponent, {
      header: `Xác nhận xóa danh mục con ${data?.sub_category_name}`,
      width: '70%',
      dismissableMask: true,
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        message: `
        Nếu bạn xóa danh mục con
        ${data?.sub_category_name}
        thì tất cả sản phẩm cũng sẽ bị xóa. Bạn có chắc chắn muốn xóa?`,
      },
    });

    ref.onClose.subscribe((res) => {
      if (res) {
      this.isLoading = true;
        this.categoryService.deleteSubCategory(data?.id).subscribe(
          (res) => {
            if (res?.message) {
              this.currentPage = 1;
              this.isLoading = false;
              this.getSubCategories();
              this.toastService.showMessage(
                ToasSumary.Success,
                res?.message,
                ToastType.Success
              );
            }
          },
          () => {
            this.isLoading = false;
          }
        );
      }
    });
  }

  showModalAddNew() {
    const ref = this.dialogService.open(AddNewSubCategoryComponent, {
      header: 'Thêm Danh Mục',
      width: '70%',
      dismissableMask: true,
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        category: this.selectedCategory,
      },
    });

    ref.onClose.subscribe((data) => {
      if (data) {
        this.getSubCategories();
      }
    });
  }
}
