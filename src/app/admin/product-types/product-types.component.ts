import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ImgReviewComponent } from 'src/app/img-review/img-review.component';
import { CategoryService } from 'src/service/category.service';
import { ProductsService } from 'src/service/products.service';
import { ToastService } from 'src/service/toast.service';
import { AddNewProductTypesComponent } from '../modals/add-new-product-types/add-new-product-types.component';
import { formatText } from 'src/app/constant/util.constant';
import { EditProductTypesComponent } from '../modals/edit-product-types/edit-product-types.component';
import { ConfirmationComponent } from 'src/app/modals/confirmation/confirmation.component';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';

@Component({
  selector: 'app-product-types',
  templateUrl: './product-types.component.html',
  styleUrls: ['./product-types.component.scss'],
})
export class ProductTypesComponent implements OnInit {
  productTypes: any = [];
  categories: any = [];
  selectedCategory: any;
  subCategories: any = [];
  selectedSubCategory: any;

  currentPage: any = 1;
  rowsPerPage: any = 5;
  totalCount: number = 0;
  isLoading: boolean = false;

  constructor(
    private productsService: ProductsService,
    private dialogService: DialogService,
    private toastService: ToastService,
    private categoriesService: CategoryService,
    private subCategoriesService: CategoryService
  ) {}

  ngOnInit(): void {
    // this.getProductTypes();
    this.getCategories();
  }

  openImage(imageUrl: string) {
    const ref = this.dialogService.open(ImgReviewComponent, {
      header: 'Image Review',
      dismissableMask: true,
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: { imageUrl: imageUrl },
    });
  }

  onPageChanged(event: any) {
    this.currentPage = event.page + 1;
    this.rowsPerPage = event.rows;
    this.getProductTypes();
  }

  onDropdownCategoryChange(event: any) {
    this.selectedCategory = event?.value;
    this.getSubCategories();
  }

  onDropdownSubCategoryChange(event: any) {
    this.selectedSubCategory = event?.value;
    this.getProductTypes();
  }

  getCategories() {
    this.categoriesService.getAll().subscribe(
      (data) => {
        this.categories = data?.res;
        this.selectedCategory = this.categories[0];
        this.getSubCategories();
      },
      (err) => {}
    );
  }

  getSubCategories() {
    this.categoriesService
      .getAllSubCategories(this.selectedCategory?.id)
      .subscribe(
        (data) => {
          this.subCategories = data?.res;
          this.selectedSubCategory = this.subCategories[0];
          if (this.selectedSubCategory) {
            this.getProductTypes();
          } else {
            this.productTypes = [];
          }
        },
        (err) => {}
      );
  }

  formatText(s: any) {
    return formatText(s);
  }

  getProductTypes() {
    this.isLoading = true;
    this.productsService
      .getProductTypes(
        this.selectedSubCategory?.id,
        this.currentPage,
        this.rowsPerPage
      )
      .subscribe(
        (data) => {
          this.selectedSubCategory = this.subCategories[0];
          console.log('🏍️ ~ data: ', data);
          this.productTypes = data?.res;
          this.totalCount = data?.totalCount;
          this.isLoading = false;
        },
        (err) => {
          this.isLoading = false;
        }
      );
  }

  editProductTypes(productType: any) {
    const ref = this.dialogService.open(EditProductTypesComponent, {
      header: 'Cập Nhật Loại sản phẩm',
      width: '70%',
      dismissableMask: true,
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: { productType: productType },
      footer: '',
      rtl: true,
      keepInViewport: true,
      maximizable: true,
      modal: true,
    });
    ref.onClose.subscribe((data) => {
      if (data) {
        this.getProductTypes();
      }
    });
  }

  deleteProductTypes(data: any) {
    console.log('🏍️ ~ data: ', data);
    const ref = this.dialogService.open(ConfirmationComponent, {
      header: `Xác nhận xóa loại sản phẩm ${data?.product_type_name}`,
      width: '70%',
      dismissableMask: true,
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        message: `
        Nếu bạn xóa loại sản phẩm
        ${data?.product_type_name}
        thì tất cả sản phẩm cũng sẽ bị xóa. Bạn có chắc chắn muốn xóa?`,
      },
    });
    ref.onClose.subscribe((res) => {
      if (res) {
        this.isLoading = true;
        this.productsService.deleteProductType(data?.id).subscribe(
          (res) => {
            if (res?.message) {
              this.currentPage = 1;
              this.isLoading = false;
              this.getProductTypes();
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
    const ref = this.dialogService.open(AddNewProductTypesComponent, {
      header: 'Thêm Loại Sản Phẩm',
      footer: '',
      width: '70%',
      dismissableMask: true,
      rtl: true,
      keepInViewport: true,
      maximizable: true,
      modal: true,
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        subCategoryId: this.selectedSubCategory?.id,
      },
    });
    ref.onClose.subscribe((data) => {
      if (data) {
        this.getProductTypes();
      }
    });
  }
}
