import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { ToastService } from 'src/service/toast.service';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';
import { ProductsService } from 'src/service/products.service';
import { Router } from '@angular/router';
import { PaymentMenthodService } from '../service/payment-menthod.service';
import { UserService } from 'src/service/user.service';
import jwt_decode from 'jwt-decode';
import { OrderService } from '../service/order.service';
import { LoadingService } from 'src/service/loading.service';
import { ORDER_STATUS } from '../constant/order-status.constant';
import { getKeyByValue } from '../constant/util.constant';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  cartItems: any = [];
  paymentMenthods: any = [];
  address: any = [];
  addressOptions: any;
  currentUser: any;

  selectedPaymentMethod: any;
  selectedAddress: any;

  constructor(
    private cartService: CartService,
    private toastService: ToastService,
    private productsService: ProductsService,
    private paymentMenthodService: PaymentMenthodService,
    private router: Router,
    private userService: UserService,
    private orderService: OrderService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    console.log('🏍️ ~ this.cartItems: ', this.cartItems);

    this.paymentMenthodService.getAll().subscribe((data: any) => {
      this.paymentMenthods = data?.res;
      console.log('🏍️ ~ this.paymentMenthods: ', this.paymentMenthods);
    });

    const token = localStorage.getItem('token');
    console.log('🏍️ ~ token: ', token);
    if (token) {
      console.log('🏍️ ~ token: ', token);
      this.currentUser = jwt_decode(token);

      this.getUserById(this.currentUser?.id)
        .then((data: any) => {
          this.currentUser = data;
          this.address = JSON.parse(this.currentUser?.addresses);
          this.addressOptions = this.mappingAddress(this.address);
          this.selectedAddress = this.addressOptions[0];
          console.log('🏍️ ~ this.addressOptions: ', this.addressOptions);
        })
        .catch((error: any) => {});
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

  mappingAddress(data: any) {
    console.log('🏍️ ~ data: ', data);
    let address = data.map((d: any, index: number) => {
      return {
        displayName:
          d?.street + ', ' + d?.ward + ', ' + d?.district + ', ' + d?.province,
        index: index,
      };
    });

    return address;
  }

  onDropdownPaymentMethodChange(event: any) {
    this.selectedPaymentMethod = event?.value;
  }

  onDropdownAddressChange(event: any) {
    this.selectedAddress = event?.value;
    console.log('🏍️ ~ this.selectedAddress: ', this.selectedAddress);
  }

  getTotalPrice() {
    let total = 0;
    this.cartItems.forEach((item: any) => {
      total += item?.price * item?.orderQty;
    });

    return total;
  }

  removeCart(cart: any) {
    this.cartService.removeFromCart(cart);
    this.cartItems = this.cartItems.filter((item: any) => item.id !== cart?.id);
  }

  onChangeQty(cart: any) {
    this.cartService.updateQuantity(cart, cart?.orderQty);
  }

  onClickProduct(product: any) {
    this.router.navigate(['/product-details'], {
      queryParams: { id: product?.id },
    });
  }

  payment() {
    if (!this.cartItems.length || !this.cartItems) {
      return;
    }

    if (this.selectedPaymentMethod?.id === 3) {
      let items = this.cartItems.map((c: any) => {
        return {
          id: c?.id,
          quantiry: c?.orderQty,
        };
      });

      let data = {
        user_id: this.currentUser?.id,
        items: items,
        total_amount: this.getTotalPrice(),
        payment_method_id: this.selectedPaymentMethod?.id,
        order_status: getKeyByValue(ORDER_STATUS, ORDER_STATUS.AWAITING_CONFIRMATION),
        province: this.address[this.selectedAddress.index].province,
        district: this.address[this.selectedAddress.index].district,
        ward: this.address[this.selectedAddress.index].ward,
        street: this.address[this.selectedAddress.index].street,
      };

      this.orderService.create(data).subscribe(
        (data: any) => {
          this.loadingService.hideLoading();
          localStorage.removeItem('cartItems');
          location.reload();
          this.toastService.showMessage(
            ToasSumary.Success,
            'Đặt hàng thành công!',
            ToastType.Success
          );
        },
        (err) => {
          this.toastService.showMessage(
            ToasSumary.Error,
            err?.error?.message,
            ToastType.Error
          );
          this.loadingService.hideLoading();
        }
      );
    }
  }
}
