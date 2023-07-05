import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/service/products.service';
import { CartService } from '../service/cart.service';
import { getColor } from '../constant/util.constant';
import { UserService } from 'src/service/user.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  product: any;
  imgUrl: string = '';
  quantity: number = 1;
  currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService,
    private userService: UserService
  ) {
    this.route.queryParamMap.subscribe((params) => {
      const id = params.get('id');
      this.productService.getProductTypesById(id).subscribe((data: any) => {
        this.product = data;
        this.changeSelectedImg(this.product?.product_image_uuid[0]);
        console.log('🏍️ ~ this.product: ', this.product);
      });
    });

    const token = localStorage.getItem('token');
    if (token) {
      this.currentUser = jwt_decode(token);

      this.getUserById(this.currentUser?.id)
        .then((data: any) => {
          this.currentUser = data;
          console.log('🏍️ ~ this.currentUser: ', this.currentUser);
        })
        .catch((error: any) => {
          console.error('🔥 ~ error:', error);
        });
    }
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

  getColor(data: any) {
    return getColor(data);
  }

  getProductStatus(quantity: number): string {
    if (quantity <= 0) {
      return 'Tạm hết hàng';
    }

    if (quantity <= 10) {
      return `Chỉ còn ${quantity} sản phẩm`;
    }

    if (quantity > 10) {
      return `Còn ${quantity} sản phẩm`;
    }

    return '';
  }

  changeSelectedImg(imgUrl: string) {
    this.imgUrl = imgUrl;
    console.log('🏍️ ~ this.imgUrl: ', this.imgUrl);
  }

  addToCart() {
    this.cartService.addToCart({
      ...this.product,
      orderQty: this.quantity,
    });
  }
}
