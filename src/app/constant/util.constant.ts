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
  return text?.length > 25 ? text.substring(0, 25) + '...' : text;
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
  WHITE = 'Trắng',
  CYAN = 'Cyan',
  MAGENTA = 'Magenta',
  SILVER = 'Bạc',
  GOLD = 'Vàng đồng',
}

export function convertDialColor(value: any) {
  const colorValues = Object.values(DIAL_COLOR);
  const colorKeys = Object.keys(DIAL_COLOR);

  const index = colorValues.indexOf(value);
  if (index !== -1) {
    return colorKeys[index];
  }

  return '';
}

export function getDialColorValue(key: string) {
  switch (key) {
    case 'Đỏ':
      return getKeyByValue(DIAL_COLOR, DIAL_COLOR.RED);
    case 'Cam':
      return getKeyByValue(DIAL_COLOR, DIAL_COLOR.ORANGE);
    case 'Vàng':
      return getKeyByValue(DIAL_COLOR, DIAL_COLOR.YELLOW);
    case 'Xanh lá':
      return getKeyByValue(DIAL_COLOR, DIAL_COLOR.GREEN);
    case 'Xanh dương':
      return getKeyByValue(DIAL_COLOR, DIAL_COLOR.BLUE);
    case 'Indigo':
      return getKeyByValue(DIAL_COLOR, DIAL_COLOR.INDIGO);
    case 'Violet':
      return getKeyByValue(DIAL_COLOR, DIAL_COLOR.VIOLET);
    case 'Tím':
      return getKeyByValue(DIAL_COLOR, DIAL_COLOR.PURPLE);
    case 'Hồng':
      return getKeyByValue(DIAL_COLOR, DIAL_COLOR.PINK);
    case 'Nâu':
      return getKeyByValue(DIAL_COLOR, DIAL_COLOR.BROWN);
    case 'Xám':
      return getKeyByValue(DIAL_COLOR, DIAL_COLOR.GRAY);
    case 'Đen':
      return getKeyByValue(DIAL_COLOR, DIAL_COLOR.BLACK);
    case 'Trắng':
      return getKeyByValue(DIAL_COLOR, DIAL_COLOR.WHITE);
    case 'Cyan':
      return getKeyByValue(DIAL_COLOR, DIAL_COLOR.CYAN);
    case 'Magenta':
      return getKeyByValue(DIAL_COLOR, DIAL_COLOR.MAGENTA);
    case 'Bạc':
      return getKeyByValue(DIAL_COLOR, DIAL_COLOR.SILVER);
    case 'Vàng đồng':
      return getKeyByValue(DIAL_COLOR, DIAL_COLOR.GOLD);
    default:
      return '';
  }
}

export enum GENDER {
  MALE = 'Nam',
  FEMALE = 'Nữ',
  COUPLE = 'Cặp đôi',
  UNISEX = 'Unisex',
}

export function convertGender(value: string) {
  if (value === 'Nam') {
    return getKeyByValue(GENDER, GENDER.MALE);
  } else if (value === 'Nữ') {
    return getKeyByValue(GENDER, GENDER.FEMALE);
  } else if (value === 'Cặp đôi') {
    return getKeyByValue(GENDER, GENDER.COUPLE);
  } else if (value === 'Unisex') {
    return getKeyByValue(GENDER, GENDER.UNISEX);
  }
  return '';
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${day}/${month}/${year} (${hours}:${minutes}:${seconds})`;
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

export const PAYMENT_CALLBACK_URL = 'https://watchhub.website/shopping-cart';
// export const PAYMENT_CALLBACK_URL = 'http://localhost:4200/shopping-cart';

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
  {
    code: '-99',
    message: 'Đặt hàng thành công',
  },
];

export function getVnpResponseMessage(code: string): string {
  const response = VNP_RESPONSE_CODE.find((item) => item.code === code);
  return response ? response.message : 'Mã code không hợp lệ';
}

export function getColor(data: any) {
  switch (data) {
    case getKeyByValue(DIAL_COLOR, DIAL_COLOR.BLACK): {
      return DIAL_COLOR.BLACK;
    }
    case getKeyByValue(DIAL_COLOR, DIAL_COLOR.BLUE): {
      return DIAL_COLOR.BLUE;
    }
    case getKeyByValue(DIAL_COLOR, DIAL_COLOR.BROWN): {
      return DIAL_COLOR.BROWN;
    }
    case getKeyByValue(DIAL_COLOR, DIAL_COLOR.CYAN): {
      return DIAL_COLOR.CYAN;
    }
    case getKeyByValue(DIAL_COLOR, DIAL_COLOR.GOLD): {
      return DIAL_COLOR.GOLD;
    }
    case getKeyByValue(DIAL_COLOR, DIAL_COLOR.GRAY): {
      return DIAL_COLOR.GRAY;
    }
    case getKeyByValue(DIAL_COLOR, DIAL_COLOR.GREEN): {
      return DIAL_COLOR.GREEN;
    }
    case getKeyByValue(DIAL_COLOR, DIAL_COLOR.INDIGO): {
      return DIAL_COLOR.INDIGO;
    }
    case getKeyByValue(DIAL_COLOR, DIAL_COLOR.MAGENTA): {
      return DIAL_COLOR.MAGENTA;
    }
    case getKeyByValue(DIAL_COLOR, DIAL_COLOR.ORANGE): {
      return DIAL_COLOR.ORANGE;
    }
    case getKeyByValue(DIAL_COLOR, DIAL_COLOR.PINK): {
      return DIAL_COLOR.PINK;
    }
    case getKeyByValue(DIAL_COLOR, DIAL_COLOR.PURPLE): {
      return DIAL_COLOR.PURPLE;
    }
    case getKeyByValue(DIAL_COLOR, DIAL_COLOR.RED): {
      return DIAL_COLOR.RED;
    }
    case getKeyByValue(DIAL_COLOR, DIAL_COLOR.SILVER): {
      return DIAL_COLOR.SILVER;
    }
    case getKeyByValue(DIAL_COLOR, DIAL_COLOR.VIOLET): {
      return DIAL_COLOR.VIOLET;
    }
    case getKeyByValue(DIAL_COLOR, DIAL_COLOR.WHITE): {
      return DIAL_COLOR.WHITE;
    }
    case getKeyByValue(DIAL_COLOR, DIAL_COLOR.YELLOW): {
      return DIAL_COLOR.WHITE;
    }
  }

  return '';
}

export function formatName(name: string) {
  return name?.length > 52 ? name?.slice(0, 52) + ' ...' : name;
}

export const PRICE_OPTIONS = [
  { label: '0đ - 2.000.000đ', value: { min: 0, max: 2000000 } },
  { label: '2.000.000đ - 4.000.000đ', value: { min: 2000000, max: 4000000 } },
  { label: '4.000.000đ - 6.000.000đ', value: { min: 4000000, max: 6000000 } },
  { label: '6.000.000đ - 8.000.000đ', value: { min: 6000000, max: 8000000 } },
  { label: '8.000.000đ - 10.000.000đ', value: { min: 8000000, max: 10000000 } },
  {
    label: '10.000.000đ - 20.000.000đ',
    value: { min: 10000000, max: 20000000 },
  },
  {
    label: '20.000.000đ - 30.000.000đ',
    value: { min: 20000000, max: 30000000 },
  },
  {
    label: '30.000.000đ - 40.000.000đ',
    value: { min: 30000000, max: 40000000 },
  },
  { label: '> 40.000.000đ', value: { min: 40000000, max: Infinity } },
];
