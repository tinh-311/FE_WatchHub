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
