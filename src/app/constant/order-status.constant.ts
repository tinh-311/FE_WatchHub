import { getKeyByValue } from './util.constant';

export enum ORDER_STATUS {
  AWAITING_CONFIRMATION = 'Chờ xác nhận',
  ON_HOLD = 'Chờ thanh toán',
  AWAITING_SHIPMENT = 'Chờ lấy hàng',
  AWAITING_COLLECTION = 'Đang đóng gói',
  IN_TRANSIT = 'Đang giao hàng',
  DELIVERED = 'Đã giao hàng',
  CANCELLED = 'Đã huỷ',
}

export enum ORDER_STATUS_DISPLAY {
  AWAITING_CONFIRMATION = 'Chờ xác nhận',
  AWAITING_SHIPMENT = 'Chờ lấy hàng',
  IN_TRANSIT = 'Đang giao hàng',
  DELIVERED = 'Đã giao hàng',
  CANCELLED = 'Đã huỷ',
}

export function convertToDisPlayName(status: string): string {
  switch (status) {
    case getKeyByValue(ORDER_STATUS, ORDER_STATUS.AWAITING_CONFIRMATION):
      return 'Chờ xác nhận';
    case getKeyByValue(ORDER_STATUS, ORDER_STATUS.ON_HOLD):
      return 'Chờ thanh toán';
    case getKeyByValue(ORDER_STATUS, ORDER_STATUS.AWAITING_SHIPMENT):
      return 'Chờ lấy hàng';
    case getKeyByValue(ORDER_STATUS, ORDER_STATUS.AWAITING_COLLECTION):
      return 'Đang đóng gói';
    case getKeyByValue(ORDER_STATUS, ORDER_STATUS.IN_TRANSIT):
      return 'Đang giao hàng';
    case getKeyByValue(ORDER_STATUS, ORDER_STATUS.DELIVERED):
      return 'Đã giao hàng';
    case getKeyByValue(ORDER_STATUS, ORDER_STATUS.CANCELLED):
      return 'Đã huỷ';
    default:
      return '';
  }
}
