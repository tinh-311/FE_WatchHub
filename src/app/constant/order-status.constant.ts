export enum ORDER_STATUS {
  AWAITING_CONFIRMATION = 'Chờ xác nhận',
  ON_HOLD = 'Chờ thanh toán',
  AWAITING_SHIPMENT = 'Chờ lấy hàng',
  AWAITING_COLLECTION = 'Người gửi đang chuẩn bị hàng',
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
