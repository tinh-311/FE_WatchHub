import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { getAuth, signOut } from 'firebase/auth';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FullScreenService } from 'src/service/full-screen.service';
import jwt_decode from 'jwt-decode';
import * as LR from '@uploadcare/blocks';
import { CategoryService } from 'src/service/category.service';
import { LoadingService } from 'src/service/loading.service';
import { BreadcrumbService } from 'src/service/breadcrumb.service';
import { UtilService } from 'src/service/util.service';
import { finalize } from 'rxjs';
import { ProductsService } from 'src/service/products.service';
import { CartService } from '../service/cart.service';
import { UserService } from 'src/service/user.service';

LR.registerBlocks(LR);
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  searchInput: string = '';
  isFullScreen: boolean = false;
  currentUser: any;
  categories: any;
  selectedItemHeader: any;
  breadcrumbItems: any;

  filteredProducts: any = [];

  cartItems: any;

  constructor(
    private router: Router,
    private fullScreenService: FullScreenService,
    private categoryService: CategoryService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private utilService: UtilService,
    private productService: ProductsService,
    private cartService: CartService,
    private userService: UserService
  ) {
    this.cartItems = this.cartService.getCartItems();

    this.route.queryParams.subscribe((params) => {
      const categoryName = params['categoryName'];
      this.selectedItemHeader = categoryName;
      if (categoryName === 'ALL') {
        this.selectedItemHeader = 'ALL';
      }
      this.getCategories();
    });

    const token = localStorage.getItem('token');
    console.log('🏍️ ~ token: ', token);
    if (token) {
      const user: any = jwt_decode(token);
      console.log('🏍️ ~ user: ', user);
      this.userService.getUserByID(user?.id).subscribe((data: any) => {
        this.currentUser = data;
        console.log('🏍️ ~ this.currentUser: ', this.currentUser);
      });
    }

    this.utilService.user$.subscribe((data) => {
      const token = localStorage.getItem('token');
      if (token) {
        this.currentUser = jwt_decode(token);
      }
    });
  }

  ngOnInit() {
    this.cartService.cartItemsChanged.subscribe(() => {
      this.cartItems = this.cartService.getCartItems();
    });
  }

  ngAfterViewInit() {}

  getCategories() {
    this.loadingService.showLoading();
    this.categoryService.getAll().subscribe(
      (data: any) => {
        this.categories = data?.res || [];
        this.loadingService.hideLoading();
      },
      (err) => {
        this.loadingService.hideLoading();
      }
    );
  }

  isMobileScreen(): boolean {
    const mobileScreenWidth = 768;
    return window.innerWidth < mobileScreenWidth;
  }

  navigateAdmin() {
    this.router.navigate(['/admin']);
  }

  navigateLogin() {
    this.router.navigate(['/login']);
  }

  toggleFullscreen() {
    this.isFullScreen = !this.isFullScreen;
    this.fullScreenService.toggleFullscreen();
  }

  onClickFavourite() {}

  onClickCart() {
    if (!this.currentUser) {
      return;
    }

    this.router.navigate(['/shopping-cart']);
  }

  logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Đăng xuất thành công
        console.log('Đăng xuất thành công');
        localStorage.clear();
        this.router.navigate(['/login']);
        setTimeout(() => {
          location.href = location.href;
        }, 100);
      })
      .catch((error) => {
        // Xảy ra lỗi khi đăng xuất
        console.error('Lỗi đăng xuất:', error);
      });
  }

  onClickCategory(data: any) {
    const categoryId = data.id;
    let categoryName = data.category_name;

    if (data === 'ALL') {
      categoryName = data;
    }

    const queryParams: NavigationExtras = {
      queryParams: { categoryName, categoryId },
    };

    this.router.navigate(['/subcategory'], queryParams);
  }

  searchProducts(event: any) {
    const query = event.query;
    this.productService.search(query).subscribe((data) => {
      this.filteredProducts = data?.res;
    });
  }

  onClickItemSearch(data: any) {
    this.router.navigate(['/product-details'], {
      queryParams: { id: data?.id },
    });
  }
}
