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
import { CartService } from '../service/cart.service';

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
  isShowCategories: boolean = true;

  cartItems: any = [];

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productsService: ProductsService,
    private loadingService: LoadingService,
    private router: Router,
    private cartService: CartService
  ) {
    this.isDataLoading = false;
    this.route.queryParams.subscribe(
      async (params) => {
        const categoryId = await params['categoryId'];
        const categoryName = params['categoryName'];
        this.isShowCategories = true;
        console.log('🏍️ ~ categoryName: ', categoryName);
        if (categoryName === 'ALL') {
          this.isShowCategories = false;
          this.getAllPT();
          return;
        }
        this.getAllSubCategories(categoryId);
      },
      (err) => {
        this.loadingService.hideLoading();
      }
    );
  }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
  }

  ngAfterViewInit() {}

  getAllPT() {
    this.isDataLoading = true;
    this.productsService
      .getAllProductTypes(this.currentPage, this.rowsPerPage)
      .subscribe(
        (data) => {
          console.log('🏍️ ~ data sas: ', data);
          this.products = data?.res;
          this.totalRecords = data?.totalCount;
          this.isDataLoading = false;
        },
        (err) => {
          this.isDataLoading = false;
        }
      );
  }

  onPageChanged(event: any) {
    this.currentPage = event.page + 1;
    this.rowsPerPage = event.rows;
    if (this.isShowCategories) {
      this.getProductTypes();
    } else {
      this.getAllPT();
    }
  }

  onCliskSubCategory(subCategory: any) {
    this.selectedSubCategory = subCategory;
    if (this.isShowCategories) {
      this.getProductTypes();
    } else {
      this.getAllPT();
    }
  }

  getAllSubCategories(categoryId: any) {
    this.loadingService.showLoading();
    this.categoryService.getAllSubCategories(categoryId).subscribe(
      (data) => {
        this.subCategories = data?.res;
        this.selectedSubCategory = this.subCategories[0];
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
        this.totalRecords = data?.totalCount;
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

  getSeverityString(product: any) {
    if (product.quantity <= 0) {
      return 'Tạm hết hàng';
    }

    if (product.quantity <= 10) {
      return 'Chỉ còn ' + product.quantity + ' sản phẩm';
    }

    return 'Còn ' + product.quantity + ' sản phẩm';
  }

  onClickProduct(product: any) {
    this.router.navigate(['/product-details'], {
      queryParams: { id: product?.id },
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart({
      ...product
    });
  }

  removeFromCart(item: any) {
    this.cartService.removeFromCart(item);
    this.cartItems = this.cartService.getCartItems();
  }

  updateQuantity(item: any, quantity: number) {
    this.cartService.updateQuantity(item, quantity);
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = this.cartService.getCartItems();
  }
}
