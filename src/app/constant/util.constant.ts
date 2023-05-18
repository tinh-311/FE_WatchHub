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
