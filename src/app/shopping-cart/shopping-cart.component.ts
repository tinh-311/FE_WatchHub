import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { ToastService } from 'src/service/toast.service';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';
import { ProductsService } from 'src/service/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentMenthodService } from '../service/payment-menthod.service';
import { UserService } from 'src/service/user.service';
import jwt_decode from 'jwt-decode';
import { OrderService } from '../service/order.service';
import { LoadingService } from 'src/service/loading.service';
import { ORDER_STATUS } from '../constant/order-status.constant';
import {
  PAYMENT_CALLBACK_URL,
  VNP_RESPONSE_CODE,
  getKeyByValue,
} from '../constant/util.constant';
import { PaymentService } from '../service/payment.service';
import { SelectItem } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  cartItems: any[] = [];
  paymentMenthods: any = [];
  address: any = [];
  addressOptions: any;
  currentUser: any;

  selectedPaymentMethod: any;
  selectedAddress: any;
  selectedProducts: any[] = [];
  draggedProduct: any | undefined | null;

  phoneNumberForm: any = this.formBuilder.group({
    phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
  });

  get phoneNumber() {
    return this.phoneNumberForm.get('phoneNumber');
  }

  constructor(
    private cartService: CartService,
    private toastService: ToastService,
    private productsService: ProductsService,
    private paymentMenthodService: PaymentMenthodService,
    private router: Router,
    private userService: UserService,
    private orderService: OrderService,
    private loadingService: LoadingService,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.getParamsFromUrl();
  }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.paymentMenthodService.getAll().subscribe((data: any) => {
      this.paymentMenthods = data?.res;
    });

    const token = localStorage.getItem('token');
    if (token) {
      this.currentUser = jwt_decode(token);

      this.getUserById(this.currentUser?.id)
        .then((data: any) => {
          this.currentUser = data;
          this.address = JSON.parse(this.currentUser?.addresses);
          this.addressOptions = this.mappingAddress(this.address);
          this.selectedAddress = this.addressOptions[0];
        })
        .catch((error: any) => {});
    }
  }

  dragStart(product: any) {
    this.draggedProduct = product;
  }

  drop() {
    if (this.draggedProduct) {
      let draggedProductIndex = this.findIndex(this.draggedProduct);
      this.selectedProducts = [
        ...(this.selectedProducts as any[]),
        this.draggedProduct,
      ];
      this.cartItems = this.cartItems?.filter(
        (val, i) => i != draggedProductIndex
      );
      console.log('🏍️ ~ this.cartItems: ', this.cartItems);
      console.log('🏍️ ~ this.selectedProducts: ', this.selectedProducts);

      this.draggedProduct = null;
    }
  }

  dragEnd() {
    this.draggedProduct = null;
  }

  findIndex(product: any) {
    let index = -1;
    for (let i = 0; i < (this.cartItems as any[]).length; i++) {
      if (product.id === (this.cartItems as any[])[i].id) {
        index = i;
        break;
      }
    }
    return index;
  }

  getParamsFromUrl(): void {
    const queryParams: any = this.route.snapshot.queryParams;
    if (Object.keys(queryParams).length === 0) {
      return;
    }

    const token = localStorage.getItem('token');
    if (token) {
      this.currentUser = jwt_decode(token);
    }

    const orderID = localStorage.getItem('orderID');
    const dataPayment = {
      amount: queryParams.vnp_Amount,
      bankCode: queryParams.vnp_BankCode,
      bankTranNo: queryParams.vnp_BankTranNo,
      cardType: queryParams.vnp_CardType,
      orderInfo: queryParams.vnp_OrderInfo,
      payDate: queryParams.vnp_PayDate,
      responseCode: queryParams.vnp_ResponseCode,
      tmnCode: queryParams.vnp_TmnCode,
      transactionNo: queryParams.vnp_TransactionNo,
      transactionStatus: queryParams.vnp_TransactionStatus,
      txnRef: queryParams.vnp_TxnRef,
      secureHash: queryParams.vnp_SecureHash,
      userID: this.currentUser?.id,
      orderID: orderID,
    };
    console.log('🏍️ ~ dataPayment: ', dataPayment);

    switch (queryParams.vnp_ResponseCode) {
      case '00': {
        this.paymentService.storeTransaction(dataPayment).subscribe(
          (store: any) => {
            console.log('🏍️ ~ store: ', store)
            // this.router.navigate(['/thank-you']);
          },
          (err) => {}
        );
        break;
      }
      case '07': {
        const response = VNP_RESPONSE_CODE.find((item) => item.code === '07');
        this.paymentService.storeTransaction(dataPayment).subscribe(
          (store: any) => {
            this.router.navigate(['/thank-you']);
          },
          (err) => {}
        );
        break;
      }
      case '09': {
        const response = VNP_RESPONSE_CODE.find((item) => item.code === '09');
        this.paymentService.storeTransaction(dataPayment).subscribe(
          (store: any) => {
            this.router.navigate(['/thank-you']);
          },
          (err) => {}
        );
        break;
      }
      case '10': {
        const response = VNP_RESPONSE_CODE.find((item) => item.code === '10');
        this.paymentService.storeTransaction(dataPayment).subscribe(
          (store: any) => {
            this.router.navigate(['/thank-you']);
          },
          (err) => {}
        );
        break;
      }
      case '11': {
        const response = VNP_RESPONSE_CODE.find((item) => item.code === '11');
        this.paymentService.storeTransaction(dataPayment).subscribe(
          (store: any) => {
            this.router.navigate(['/thank-you']);
          },
          (err) => {}
        );
        break;
      }
      case '12': {
        const response = VNP_RESPONSE_CODE.find((item) => item.code === '12');
        this.paymentService.storeTransaction(dataPayment).subscribe(
          (store: any) => {
            this.router.navigate(['/thank-you']);
          },
          (err) => {}
        );
        break;
      }
      case '13': {
        const response = VNP_RESPONSE_CODE.find((item) => item.code === '13');
        this.paymentService.storeTransaction(dataPayment).subscribe(
          (store: any) => {
            this.router.navigate(['/thank-you']);
          },
          (err) => {}
        );
        break;
      }
      case '24': {
        const response = VNP_RESPONSE_CODE.find((item) => item.code === '24');
        this.paymentService.storeTransaction(dataPayment).subscribe(
          (store: any) => {
            this.router.navigate(['/thank-you']);
          },
          (err) => {}
        );
        break;
      }
      case '51': {
        const response = VNP_RESPONSE_CODE.find((item) => item.code === '51');
        this.paymentService.storeTransaction(dataPayment).subscribe(
          (store: any) => {
            this.router.navigate(['/thank-you']);
          },
          (err) => {}
        );
        break;
      }
      case '65': {
        const response = VNP_RESPONSE_CODE.find((item) => item.code === '65');
        this.paymentService.storeTransaction(dataPayment).subscribe(
          (store: any) => {
            this.router.navigate(['/thank-you']);
          },
          (err) => {}
        );
        break;
      }
      case '75': {
        const response = VNP_RESPONSE_CODE.find((item) => item.code === '75');
        this.paymentService.storeTransaction(dataPayment).subscribe(
          (store: any) => {
            this.router.navigate(['/thank-you']);
          },
          (err) => {}
        );
        break;
      }
      case '79': {
        const response = VNP_RESPONSE_CODE.find((item) => item.code === '79');
        this.paymentService.storeTransaction(dataPayment).subscribe(
          (store: any) => {
            this.router.navigate(['/thank-you']);
          },
          (err) => {}
        );
        break;
      }
      case '99': {
        const response = VNP_RESPONSE_CODE.find((item) => item.code === '99');
        this.paymentService.storeTransaction(dataPayment).subscribe(
          (store: any) => {
            this.router.navigate(['/thank-you']);
          },
          (err) => {}
        );
        break;
      }
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
  }

  getTotalPrice() {
    let total = 0;
    this.selectedProducts.forEach((item: any) => {
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

  addSelectedCart(event: any) {
    this.selectedProducts.push(event);
    this.cartItems = this.cartItems.filter((cart) => cart.id !== event.id);
  }

  removeSelectedCart(event: any) {
    this.cartItems.push(event);
    this.selectedProducts = this.selectedProducts.filter(
      (cart) => cart.id !== event.id
    );
  }

  payment() {
    // 2: VNPay, 3: COD, 4:MOMO

    if (!this.selectedProducts.length || !this.selectedProducts) {
      return;
    }

    this.cartItems = this.cartItems.filter(
      (cart) => !this.selectedProducts.some((s) => cart.id === s.id)
    );

    let items = this.selectedProducts.map((c: any) => {
      return {
        id: c?.id,
        quantity: c?.orderQty,
      };
    });

    let data = {
      user_id: this.currentUser?.id,
      items: items,
      total_amount: this.getTotalPrice(),
      payment_method_id: this.selectedPaymentMethod?.id,
      order_status: getKeyByValue(
        ORDER_STATUS,
        ORDER_STATUS.AWAITING_CONFIRMATION
      ),
      province: this.address[this.selectedAddress.index].province,
      district: this.address[this.selectedAddress.index].district,
      ward: this.address[this.selectedAddress.index].ward,
      street: this.address[this.selectedAddress.index].street,
      product_image_uuid: this.selectedProducts[0]?.product_image_uuid,
      phone: this.phoneNumber?.value,
    };
    console.log('🏍️ ~ data: ', data);

    switch (this.selectedPaymentMethod?.id) {
      case 3: {
        this.orderService.create(data).subscribe(
          (data: any) => {
            this.loadingService.hideLoading();
            localStorage.removeItem('cartItems');
            this.cartService.updateCart(this.cartItems);
            // location.reload();
            this.router.navigate(['/thank-you'],
            {
              queryParams: { code: '-99' },
            });
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
        break;
      }
      case 2: {
        this.paymentService
          .vnPay({
            amount: this.getTotalPrice(),
            callbackUrl: PAYMENT_CALLBACK_URL,
          })
          .subscribe(
            (dataVNP: any) => {
              console.log('🏍️ ~ dataVNP: ', dataVNP)
              // create order
              this.orderService.create(data).subscribe(
                (orderRES: any) => {
                  localStorage.setItem('orderID', orderRES.orderId);
                  localStorage.removeItem('cartItems');
                  this.cartService.updateCart(this.cartItems);
                  window.location.href = dataVNP.url;
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
            },
            (err) => {
              console.log('🏍️ ~ err: ', err)
            }
          );
        break;
      }
    }
  }
}
