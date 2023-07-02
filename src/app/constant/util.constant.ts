export function parseAddressData(data: any) {
  const address = {
    road: data.results[0].components.road || '',
    suburb: data.results[0].components.suburb || '',
    city_district: data.results[0].components.city_district || '',
    city: data.results[0].components.city || '',
  };

  return address;
}

export function formatAddress(data: any) {
  return data?.results[0]?.formatted;
}

export function normalizeName(s: any) {
  if (!isNaN(s)) {
    if (/^0\d+$/.test(s)) {
      s = s.replace(/^0+/, '');
    }
  }
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function formatText(text: any) {
  return text.length > 25 ? text.substring(0, 25) + '...' : text;
}

export const UUID_DEFAUL_AVATAR =
  'https://ucarecdn.com/e9c59ff0-2a37-4c58-840f-b2c4d1f1ed2c/user.webp';

export enum DIAL_COLOR {
  RED = 'Đỏ',
  ORANGE = 'Cam',
  YELLOW = 'Vàng',
  GREEN = 'Xanh lá',
  BLUE = 'Xanh dương',
  INDIGO = 'Indigo',
  VIOLET = 'Violet',
  PURPLE = 'Tím',
  PINK = 'Hồng',
  BROWN = 'Nâu',
  GRAY = 'Xám',
  BLACK = 'Đen',
  WHITE = 'Trăng',
  CYAN = 'Cyan',
  MAGENTA = 'Magenta',
  SILVER = 'Bạc',
  GOLD = 'Vàng đồng',
}

export enum GENDER {
  MALE = 'Nam',
  FEMALE = 'Nữ',
  COUPLE = 'Cặp đôi',
  UNISEX = 'Unisex',
}

export function getKeyByValue<T extends string | number>(
  enumObject: Record<string, T>,
  enumValue: T
): keyof typeof enumObject | undefined {
  return Object.keys(enumObject).find((key) => enumObject[key] === enumValue);
}

export function parseJSON(json: any) {
  return JSON.parse(json);
}

export const PAYMENT_CALLBACK_URL = 'http://localhost:4200/shopping-cart';

export const VNP_RESPONSE_CODE = [
  { code: '00', message: 'Giao dịch thành công' },
  {
    code: '07',
    message:
      'Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường)',
  },
  {
    code: '09',
    message:
      'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng',
  },
  {
    code: '10',
    message:
      'Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần',
  },
  {
    code: '11',
    message:
      'Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch',
  },
  {
    code: '12',
    message:
      'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa',
  },
  {
    code: '13',
    message:
      'Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch',
  },
  {
    code: '24',
    message: 'Giao dịch không thành công do: Khách hàng hủy giao dịch',
  },
  {
    code: '51',
    message:
      'Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch',
  },
  {
    code: '65',
    message:
      'Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày',
  },
  { code: '75', message: 'Ngân hàng thanh toán đang bảo trì' },
  {
    code: '79',
    message:
      'Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch',
  },
  {
    code: '99',
    message:
      'Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)',
  },
];
