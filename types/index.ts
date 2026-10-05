export type Cuisine = 'pizza' | 'sushi' | 'burger' | 'asian' | 'georgian' | 'coffee' | 'dessert';

export type Restaurant = {
  id: string;
  name: string;
  description: string;
  image: string;
  cuisine: Cuisine;
  rating: number;
  reviewsCount: number;
  deliveryTime: number;
  minOrder: number;
  deliveryFee: number;
  isOpen: boolean;
};

export type MenuCategory = 'Популярное' | 'Салаты' | 'Супы' | 'Горячее' | 'Пицца' | 'Суши' | 'Десерты' | 'Напитки';

export type MenuItem = {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: MenuCategory;
  weight: string; // "350 г"
};

export type CartItem = {
  menuItemId: string;
  name: string;
  price: number;
  image: string;
  weight: string;
  restaurantId: string;
  restaurantName: string;
  quantity: number;
};

export type OrderStatus = 'accepted' | 'preparing' | 'delivering' | 'delivered';

export type StatusEntry = {
  status: OrderStatus;
  timestamp: number;
};

export type Order = {
  id: string;
  restaurantId: string;
  restaurantName: string;
  items: CartItem[];
  customer: {
    name: string;
    phone: string;
    address: string;
    comment?: string;
  };
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  statusHistory: StatusEntry[];
  createdAt: number;
};