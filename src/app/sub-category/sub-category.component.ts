import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from 'src/service/breadcrumb.service';
import { CategoryService } from 'src/service/category.service';
import { LoadingService } from 'src/service/loading.service';
import { ProductsService } from 'src/service/products.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss'],
})
export class SubCategoryComponent implements OnInit, AfterViewInit {
  subCategories: any = [];
  products: any = [];
  totalRecords: number = 0;
  selectedSubCategory: any;
  layout = 'grid';
  items: MenuItem[] = [];
  home: any;
  currentPage: any = 1;
  rowsPerPage: any = 6;
  isDataLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productsService: ProductsService,
    private loadingService: LoadingService,
    private router: Router
  ) {
    this.isDataLoading = false;
    this.route.queryParams.subscribe(
      async (params) => {
        const categoryId = await params['categoryId'];
        const categoryName = params['categoryName'];
        this.home = { icon: 'pi pi-home', routerLink: '/' };
        this.items = [{ label: categoryName }];
        this.getAllSubCategories(categoryId);
      },
      (err) => {
        this.loadingService.hideLoading();
      }
    );
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  onPageChanged(event: any) {
    this.currentPage = event.page + 1;
    this.rowsPerPage = event.rows;
    this.getProductTypes();
  }

  onCliskSubCategory(subCategory: any) {
    this.selectedSubCategory = subCategory;
    this.getProductTypes();
  }

  getAllSubCategories(categoryId: any) {
    this.loadingService.showLoading();
    this.categoryService.getAllSubCategories(categoryId).subscribe(
      (data) => {
        this.subCategories = data?.res;
        this.selectedSubCategory = this.subCategories[0];
        this.productsService
          .getTotalProductType(this.selectedSubCategory.id)
          .subscribe((totalRecords) => {
            this.totalRecords = totalRecords?.total;
          });

        this.getProductTypes();
        this.loadingService.hideLoading();
      },
      (err) => {
        this.loadingService.hideLoading();
      }
    );
  }

  getProductTypes() {
    if (!this.selectedSubCategory) {
      this.products = [];
      return;
    }

    this.isDataLoading = true;
    this.productsService
      .getProductTypes(
        this.selectedSubCategory.id,
        this.currentPage,
        this.rowsPerPage
      )
      .subscribe((data) => {
        this.products = data?.res;
        console.log('🏍️ ~ this.products: ', this.products);
        this.isDataLoading = false;
      });
  }

  getSeverity(product: any) {
    if (product.quantity <= 0) {
      return 'danger';
    }

    if (product.quantity <= 10) {
      return 'warning';
    }

    return 'success';
  }

  onClickProduct(product: any) {
    this.router.navigate(['/product-details'], { queryParams: { id: product?.id } });
  }
}
