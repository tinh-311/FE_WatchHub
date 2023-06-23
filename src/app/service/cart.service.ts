import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';
import { ToastService } from 'src/service/toast.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];
  cartItemsChanged = new Subject<void>();

  constructor(private toastService: ToastService) {
    this.getData();
  }

  getData() {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      this.cartItems = JSON.parse(savedCartItems);
    }
  }

  addToCart(item: any, isHidenIn?: boolean) {
    const existingItem = this.cartItems.find(
      (cartItem) => cartItem.id === item.id
    );
    if (existingItem) {
      existingItem.orderQty = item?.orderQty
        ? existingItem.orderQty + item?.orderQty
        : existingItem.orderQty + 1;

      if (existingItem.orderQty > 99) {
        this.toastService.showMessage(
          ToasSumary.Warn,
          'Bạn chỉ có thể đặt tối đa 99 sản phẩm. Nếu bạn thật sự cần có thể liên hệ chúng tôi qua mail tinh.nguyentrung311@gmail.com',
          ToastType.Warn
        );
        this.getData();
        return;
      }
    } else {
      item.orderQty = item.orderQty ? item.orderQty : 1;
      if (item.orderQty > 99) {
        this.toastService.showMessage(
          ToasSumary.Warn,
          'Bạn chỉ có thể đặt tối đa 99 sản phẩm. Nếu bạn thật sự cần có thể liên hệ chúng tôi qua mail tinh.nguyentrung311@gmail.com',
          ToastType.Warn
        );
        this.getData();
        return;
      }
      this.cartItems.push(item);
    }
    this.saveCartItems();
    this.cartItemsChanged.next();
    if (!isHidenIn) {
      this.toastService.showMessage(
        ToasSumary.Success,
        'Đã thêm vào giỏ hàng',
        ToastType.Success
      );
    }
  }

  removeFromCart(item: any) {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.saveCartItems();
    }
    this.cartItemsChanged.next();
    this.toastService.showMessage(
      ToasSumary.Success,
      'Xóa thành công',
      ToastType.Success
    );
  }

  updateQuantity(item: any, orderQty: number) {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems[index].orderQty = orderQty;
      this.saveCartItems();
    }
    this.cartItemsChanged.next();
    this.toastService.showMessage(
      ToasSumary.Success,
      'Cập nhật số lượng thành công',
      ToastType.Success
    );
  }

  private saveCartItems() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.cartItemsChanged.next();
  }

  getCartItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
    this.saveCartItems();
    this.cartItemsChanged.next();
  }
}
