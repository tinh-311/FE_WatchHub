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
    iconClass: 'fas fa-warehouse fa-2x',
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
    iconClass: 'fas fa-list fa-2x',
    name: 'PRODUCTTYPES',
    displayName: 'Loại sản phẩm',
  },
  {
    iconClass: 'fas fa-table fa-2x',
    name: 'ORDER',
    displayName: 'Đơn đặt hàng',
  },
  {
    iconClass: 'fas fa-user-circle fa-2x',
    name: 'PROFILE',
    displayName: 'Thông tin cá nhân',
  },
];

export enum SideNav {
  Dashboard = 'DASHBOARD',
  Users = 'USERS',
  Brands = 'BRANDS',
  Order = 'ORDER',
  Categories = 'CATEGORIES',
  ProductTypes = 'PRODUCTTYPES',
  SubCategories = 'SUBCATEGORIES',
  Profile = 'PROFILE',
}
