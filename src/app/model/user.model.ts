export interface User {
  id?: number,
  uid?: string,
  name?: string;
  fullname?: string,
  password?: string;
  picture?: string,
  email?: string,
  phone?: string,
  address?: string,
  avatar?: string,
  isAdmin?: boolean,
  is_deleted?: boolean,
  order_ids?: number,
  created_date?: Date,
  updated_date?: Date,
  created_user?: number,
  updated_user?: number,
}
