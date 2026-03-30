export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Sports',
  'Books',
  'Toys',
] as const;

export const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Electronics',
    stock: 50,
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category: 'Electronics',
    stock: 30,
    rating: 4.7,
  },
  {
    id: '3',
    name: 'Running Shoes',
    description: 'Comfortable running shoes for all terrains',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    category: 'Sports',
    stock: 100,
    rating: 4.3,
  },
  {
    id: '4',
    name: 'Laptop Backpack',
    description: 'Durable backpack with laptop compartment',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'Clothing',
    stock: 75,
    rating: 4.6,
  },
];

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAILS: '/products/:id',
  LOGIN: '/login',
  SIGNUP: '/signup',
  CART: '/cart',
  WISHLIST: '/wishlist',
  CHECKOUT: '/checkout',
  BLOG: '/blog',
  ABOUT: '/about',
  FAQ: '/faq',
  MENU: '/menu',
  MEAL_DETAILS: '/menu/:id',
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  CART: 'cart',
  WISHLIST: 'wishlist',
} as const;

export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  PASSWORD_MIN_LENGTH: 'Password must be at least 8 characters',
  PASSWORDS_DONT_MATCH: 'Passwords do not match',
} as const;

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in',
  SIGNUP_SUCCESS: 'Account created successfully',
  PRODUCT_ADDED_TO_CART: 'Product added to cart',
  PRODUCT_ADDED_TO_WISHLIST: 'Product added to wishlist',
} as const;
