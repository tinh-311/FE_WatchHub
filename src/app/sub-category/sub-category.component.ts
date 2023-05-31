import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/service/category.service';
import { LoadingService } from 'src/service/loading.service';
import { ProductsService } from 'src/service/products.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss'],
})
export class SubCategoryComponent implements OnInit {
  subCategories: any = [];
  products: any = [];
  totalRecords: number = 50;
  selectedSubCategory: any;
  layout: string = 'grid';

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productsService: ProductsService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    console.log('🏍️ ~ this.totalRecords: ', this.totalRecords);
    this.route.queryParams.subscribe(
      (params) => {
        const categoryId = params['categoryId'];
        this.loadingService.showLoading();
        this.categoryService.getAllSubCategories(categoryId).subscribe(
          (res) => {
            this.subCategories = res;
            this.selectedSubCategory = this.subCategories[0];
            this.getProductTypes();
            this.loadingService.hideLoading();
          },
          (err) => {
            this.loadingService.hideLoading();
          }
        );
      },
      (err) => {
        this.loadingService.hideLoading();
      }
    );
  }

  onPageChanged(event: any) {
    // Lấy thông tin trang hiện tại và số hàng trên mỗi trang từ sự kiện
    const currentPage = event.page + 1; // Vì trang đánh số từ 0, ta cộng thêm 1
    const rowsPerPage = event.rows;
    console.log('🏍️ ~ currentPage: ', currentPage);
    console.log('🏍️ ~ rowsPerPage: ', rowsPerPage);

    // Gọi API backend để lấy dữ liệu phân trang
    // Thay 'your-api-endpoint' bằng đường dẫn API backend của bạn
    // Ví dụ: this.http.get('your-api-endpoint?page=' + currentPage + '&rows=' + rowsPerPage)
    // Khi nhận được phản hồi từ API backend, cập nhật dữ liệu và tổng số bản ghi
    // Ví dụ:
    // this.http.get('your-api-endpoint?page=' + currentPage + '&rows=' + rowsPerPage)
    //   .subscribe((response: any) => {
    //     this.products = response.data;
    //     this.totalRecords = response.totalRecords;
    //   });
  }

  onCliskSubCategory(subCategory: any) {
    console.log('🏍️ ~ subCategory: ', subCategory);
    this.selectedSubCategory = subCategory;
    this.getProductTypes();
  }

  getProductTypes() {
    if (!this.selectedSubCategory) {
      this.products = [];
      return;
    }

    this.productsService
      .getProductTypes(this.selectedSubCategory.id)
      .subscribe((res) => {
        console.log('🏍️ ~ res: ', res);
        this.products = res;
      });
  }

  getSeverity(product: any) {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warning';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return null;
    }
  }
}
