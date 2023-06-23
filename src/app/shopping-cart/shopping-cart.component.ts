import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { ToastService } from 'src/service/toast.service';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';
import { ProductsService } from 'src/service/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  cartItems: any = [];

  constructor(
    private cartService: CartService,
    private toastService: ToastService,
    private productsService: ProductsService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    console.log('🏍️ ~ this.cartItems: ', this.cartItems);
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
}
