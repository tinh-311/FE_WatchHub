import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private cdRef: ChangeDetectorRef,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params) => {
        const categoryId = params['categoryId'];
        const categoryName = params['categoryName'];
        this.home = { icon: 'pi pi-home', routerLink: '/' };
        this.items = [{ label: categoryName }];

        this.loadingService.showLoading();
        this.categoryService.getAllSubCategories(categoryId).subscribe(
          (res) => {
            this.subCategories = res;
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
      },
      (err) => {
        this.loadingService.hideLoading();
      }
    );
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.cdRef.detectChanges();
    });
  }

  onPageChanged(event: any) {
    this.currentPage = event.page + 1;
    this.rowsPerPage = event.rows;
    this.getProductTypes();
  }

  onCliskSubCategory(subCategory: any) {
    this.selectedSubCategory = subCategory;
    this.getProductTypes();
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
