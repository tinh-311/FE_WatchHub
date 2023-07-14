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
import { UserService } from 'src/service/user.service';
import jwt_decode from 'jwt-decode';
import { BrandsService } from '../brands.service';
import { ProductAlbertService } from '../service/product-albert.service';
import { ProductCoreService } from '../service/product-core.service';
import { DIAL_COLOR, GENDER } from '../constant/util.constant';
import { ProductGlassService } from '../service/product-glass.service';
import { forkJoin } from 'rxjs';

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
  rowsPerPage: any = 12;
  isDataLoading: boolean = false;
  isShowCategories: boolean = true;

  cartItems: any = [];
  currentUser: any;
  brands: any;
  alberts: any;
  glasses: any;
  cores: any;
  genders: string[] = Object.values(GENDER);
  colors: string[] = Object.values(DIAL_COLOR);
  selectedBrands: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productsService: ProductsService,
    private loadingService: LoadingService,
    private router: Router,
    private cartService: CartService,
    private userService: UserService,
    private brandService: BrandsService,
    private productAlbertService: ProductAlbertService,
    private productCoreService: ProductCoreService,
    private productGlassService: ProductGlassService,
  ) {
    this.isDataLoading = false;
    this.route.queryParams.subscribe(
      async (params) => {
        const categoryId = await params['categoryId'];
        const categoryName = params['categoryName'];
        this.isShowCategories = true;
        if (categoryName === 'ALL') {
          this.isShowCategories = false;
          this.getAllPT();
          return;
        }
        this.getAllSubCategories(categoryId);
      },
      (err) => {}
    );

    const token = localStorage.getItem('token');
    if (token) {
      this.currentUser = jwt_decode(token);

      this.getUserById(this.currentUser?.id)
        .then((data: any) => {
          this.currentUser = data;
        })
        .catch((error: any) => {
          console.error('🔥 ~ error:', error);
        });
    }
  }

  onCheckboxChange(event: any, brandName: string) {
    if (event.target.checked) {
      this.selectedBrands.push(brandName);
    } else {
      const index = this.selectedBrands.indexOf(brandName);
      if (index !== -1) {
        this.selectedBrands.splice(index, 1);
      }
    }

    console.log('🏍️ ~ this.selectedBrands: ', this.selectedBrands);
    const filters = {
      brands: this.selectedBrands
    }
    console.log('🏍️ ~ filters: ', filters)
    this.getProductTypes(filters);
  }

  getUserById(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.getUserByID(id).subscribe(
        (data: any) => {
          resolve(data);
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();

    forkJoin([
      this.productGlassService.getAll(),
      this.brandService.getAll(),
      this.productAlbertService.getAll(),
      this.productCoreService.getAll()
    ]).subscribe(([glasses, brands, alberts, cores]: [any, any, any, any]) => {
      this.glasses = glasses?.res;
      this.brands = brands.res;
      this.alberts = alberts.res;
      this.cores = cores.res;
    });
  }

  ngAfterViewInit() {}

  getAllPT() {
    this.isDataLoading = true;
    this.productsService
      .getAllProductTypes(this.currentPage, this.rowsPerPage)
      .subscribe(
        (data) => {
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
    this.categoryService.getAllSubCategories(categoryId).subscribe(
      (data) => {
        this.subCategories = data?.res;
        this.selectedSubCategory = this.subCategories[0];
        this.getProductTypes();
      },
      (err) => {}
    );
  }

  getProductTypes(filters?: any) {
    console.log('🏍️ ~ filters: ', filters)
    if (!this.selectedSubCategory) {
      this.products = [];
      return;
    }

    this.isDataLoading = true;
    this.productsService
      .filterBySubCategoryId(this.selectedSubCategory.id, this.currentPage, this.rowsPerPage, filters || {})
      .subscribe(
        (data: any) => {
          this.products = data?.res;
          console.log('🏍️ ~ this.products: ', this.products)
          this.totalRecords = data?.totalCount;
          this.isDataLoading = false;
        },
        (err) => {
          this.isDataLoading = false;
        }
      );
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
      ...product,
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
