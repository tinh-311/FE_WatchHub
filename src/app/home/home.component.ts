import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/service/products.service';
import { formatName } from '../constant/util.constant';
import { BrandsService } from '../brands.service';
import jwt_decode from 'jwt-decode';
import { UserService } from 'src/service/user.service';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  banners: any;
  responsiveOptions: any;
  newProducts: any;
  products: any;
  bestProducts: any;
  yellowRatingClass = 'yellow-rating';
  brands: any;
  currentUser: any;

  constructor(
    private router: Router,
    private productService: ProductsService,
    private brandService: BrandsService,
    private userService: UserService,
    private cartService: CartService,
  ) {}

  ngOnInit() {
    this.banners = [
      'https://ucarecdn.com/a60a6643-b399-4f3d-8ba6-ac29d2e18e33/donghonambanner.jpg',
      'https://ucarecdn.com/33933f8c-bf9c-4c2c-8020-29a9e700224b/donghonu1.jpg',
      'https://ucarecdn.com/ad6f9cab-67a1-40c6-9244-3c2f7c236768/bannerdoi.jpg',
      'https://ucarecdn.com/131550e2-f6ac-4094-98c7-5839d9b1534c/Gshock.jpg',
      'https://ucarecdn.com/365d2d33-d4d7-4b9b-83f7-c2b7f3793299/bannerCITIZEN.jpg',
      'https://ucarecdn.com/fa85b31d-e91d-4a75-a6b8-c3272a888b8a/donghoSeikoPresage.jpg',
      'https://ucarecdn.com/ddf459b4-ad46-46aa-bd32-1b4681ffc9c1/dongholimitedphienbangioihanbanner.jpg',
      'https://ucarecdn.com/a162f8b8-bef8-4375-9784-3111181f9c9e/BANNER_vang18k.jpg',
      'https://ucarecdn.com/0dccf470-60a4-42b3-9392-d66651383df7/bolocskeleton.jpg',
      'https://ucarecdn.com/e03f43c8-9e54-4019-8957-51d07ead4d53/bannerdonghodinhkimcuong.jpg',
      'https://ucarecdn.com/378ecd93-9759-42cb-bdb9-f84288bcf583/BANNER_sieumong.jpg',
      'https://ucarecdn.com/6539455f-37a8-4a08-ab73-14919a41d0f4/bannerdonghomidonamnuchinhhang.jpg',
      'https://ucarecdn.com/3192d9f8-a826-47e0-95bd-214169415b86/donghokoi.jpg',
      'https://ucarecdn.com/0c621fa5-efd3-416e-89e1-fc678a56d7f6/bannerDWthang4.png',
      'https://ucarecdn.com/65f104de-d99c-472f-a747-01c70840bda2/bannerbrandsaga.jpg',
      'https://ucarecdn.com/c0d575bc-7ec3-4051-a4ac-1c5c7515c0df/donghofossilnamnuchinhhang.jpg',
    ];

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];

    this.productService
      .filterBySubCategoryId(14, 1, 6, {
        gender: ['MALE', 'FEMALE'],
      })
      .subscribe((data: any) => {
        this.newProducts = data?.res;
      });

    this.productService
      .filterBySubCategoryId(17, 1, 6, {})
      .subscribe((data: any) => {
        this.products = data?.res;
      });

    this.productService
      .filterBySubCategoryId(25, 1, 6, {})
      .subscribe((data: any) => {
        this.bestProducts = data?.res;
      });

    this.brandService.getAll().subscribe((brands: any) => {
      this.brands = brands?.res;
      console.log('🏍️ ~ this.brands: ', this.brands);
    });

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

  addToCart(product: any) {
    this.cartService.addToCart({
      ...product,
    });
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

  formatName(name: string) {
    return formatName(name);
  }

  onClickProduct(product: any) {
    this.router.navigate(['/product-details'], {
      queryParams: { id: product?.id },
    });
  }
}
