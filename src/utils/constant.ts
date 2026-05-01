export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAILS: '/products/:id',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
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
