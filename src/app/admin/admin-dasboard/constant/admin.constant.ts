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
  Order = 'ORDER',
  Profile = 'PROFILE',
}
