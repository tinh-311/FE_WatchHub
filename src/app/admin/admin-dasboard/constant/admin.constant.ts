export const SIDE_NAV = [
  {
    iconClass: 'fas fa-tachometer-alt fa-2x',
    name: 'DASHBOARD',
    displayName: 'Bảng điều khiển',
  },
  {
    iconClass: 'fas fa-users fa-2x',
    name: 'USERS',
    displayName: 'Người dùng',
  },
  {
    iconClass: 'fas fa-tags fa-2x',
    name: 'BRANDS',
    displayName: 'Thương Hiệu',
  },
  {
    iconClass: 'fas fa-box fa-2x',
    name: 'CATEGORIES',
    displayName: 'Danh Mục',
  },
  {
    iconClass: 'fas fa-boxes fa-2x',
    name: 'SUBCATEGORIES',
    displayName: 'Danh Mục Con',
  },
  {
    iconClass: 'fas fa-minus fa-2x',
    name: 'PRODUCTALBERT',
    displayName: 'Loại dây',
  },
  {
    iconClass: 'fas fa-grip-horizontal fa-2x',
    name: 'PRODUCTCORES',
    displayName: 'Loại máy',
  },
  {
    iconClass: 'fab fa-perbyte fa-2x',
    name: 'PRODUCTGLASS',
    displayName: 'Loại Kính',
  },
  {
    iconClass: 'fas fa-cubes fa-2x',
    name: 'PRODUCTTYPES',
    displayName: 'Loại sản phẩm',
  },
  {
    iconClass: 'fas fa-shopping-cart fa-2x',
    name: 'ORDER',
    displayName: 'Đơn đặt hàng',
  }
];

export enum SideNav {
  Dashboard = 'DASHBOARD',
  Users = 'USERS',
  Brands = 'BRANDS',
  Order = 'ORDER',
  Categories = 'CATEGORIES',
  ProductAlbert = 'PRODUCTALBERT',
  ProductGlass = 'PRODUCTGLASS',
  ProductCores = 'PRODUCTCORES',
  ProductTypes = 'PRODUCTTYPES',
  SubCategories = 'SUBCATEGORIES',
  Warehouse = 'WAREHOUSE',
  Delivery = 'DELIVERY'
}
