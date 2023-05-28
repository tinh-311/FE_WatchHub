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

export const UUID_DEFAUL_AVATAR = 'e9c59ff0-2a37-4c58-840f-b2c4d1f1ed2c';
