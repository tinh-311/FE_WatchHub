import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/service/category.service';
import { LoadingService } from 'src/service/loading.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AddNewCategoryComponent } from '../modals/add-new-category/add-new-category.component';
import { ToastService } from 'src/service/toast.service';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';
import { EditCategoryComponent } from '../modals/edit-category/edit-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categories: any[] = [];
  currentPage: any = 1;
  rowsPerPage: any = 5;
  totalCount: number = 0;
  idLoading: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private loadingService: LoadingService,
    private dialogService: DialogService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  onPageChanged(event: any) {
    this.currentPage = event.page + 1;
    this.rowsPerPage = event.rows;
    this.getCategories();
  }

  getCategories() {
    this.idLoading = true;
    this.categoryService.getAll(this.currentPage, this.rowsPerPage).subscribe(
      (data) => {
        this.categories = data?.res;
        this.totalCount = data?.totalCount;
        this.loadingService.hideLoading();
        this.idLoading = false;
      },
      (err) => {
        this.idLoading = false;
        this.loadingService.hideLoading();
      }
    );
  }

  showModalAddNew() {
    const ref = this.dialogService.open(AddNewCategoryComponent, {
      header: 'Thêm Danh Mục',
      width: '70%',
      dismissableMask: true,
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000
    });

    ref.onClose.subscribe((data) => {
      this.getCategories();
    });
  }

  editCategory(category: any) {
    const ref = this.dialogService.open(EditCategoryComponent, {
      header: 'Cập Nhật Danh Mục',
      width: '70%',
      dismissableMask: true,
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
      data: { category: category }
    });

    ref.onClose.subscribe((data) => {
      this.getCategories();
    });
  }

  deleteCategory(categoryId: any) {
    this.idLoading = true;
    this.categoryService.deleteCategory(categoryId).subscribe(res => {
      if(res?.message === 'Category delete successful') {
        console.log('🏍️ ~ res: ', res)
        this.currentPage = 1;
        this.idLoading = false;
        this.getCategories();
        this.toastService.showMessage(
          ToasSumary.Success,
          res?.message,
          ToastType.Success
        );
      }

    }, () => {
      this.idLoading = false;
    })
  }
}
