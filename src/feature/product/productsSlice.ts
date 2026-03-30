import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  stock: number;
  weight?: string; // optional if some products don't have it
  tags?: string[]; // optional
  createdAt?: string; // optional, e.g., ISO date string
}

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  filters: {
    category: string;
    priceRange: [number, number];
    searchQuery: string;
  };
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  filters: {
    category: 'all',
    priceRange: [0, 1000],
    searchQuery: '',
  },
};

// Mock products data
const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Fresh Apple',
    description: 'Crisp and sweet apples. Perfect for a healthy snack.',
    price: 200.5,
    image:
      'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop',
    category: 'Fruit',
    rating: 4.5,
    stock: 120,
    weight: '100g Pack',
    tags: ['Fruits'],
    createdAt: '2026-02-10T10:00:00Z',
  },
  {
    id: 'p2',
    name: 'Banana Bunch',
    description: 'Ripe bananas full of energy. Rich in potassium.',
    price: 1.8,
    image:
      'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop',
    category: 'Fruit',
    rating: 4.7,
    stock: 90,
    weight: '150g Pack',
    tags: ['Fruits'],
    createdAt: '2026-02-10T11:00:00Z',
  },
  {
    id: 'p3',
    name: 'Broccoli',
    description: 'Fresh green broccoli. Packed with vitamins and fiber.',
    price: 3.2,
    image:
      'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=300&h=300&fit=crop',
    category: 'Vegetable',
    rating: 4.3,
    stock: 60,
    weight: '100g Pack',
    tags: ['Vegetables'],
  },
  {
    id: 'p4',
    name: 'Carrot',
    description:
      'Organic carrots for healthy eating. Great for salads and cooking.',
    price: 2.0,
    image:
      'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300&h=300&fit=crop',
    category: 'Vegetable',
    rating: 4.6,
    stock: 80,
    weight: '50g Pack',
    tags: ['Vegetables'],
  },
  {
    id: 'p5',
    name: 'Chicken Breast',
    description: 'Fresh boneless chicken breast. Lean protein source.',
    price: 7.5,
    image:
      'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&h=300&fit=crop',
    category: 'Meat',
    rating: 4.8,
    stock: 40,
    weight: '150g Pack',
  },
  {
    id: 'p6',
    name: 'Beef Steak',
    description: 'Premium quality beef steak. Perfect for grilling.',
    price: 12.0,
    image:
      'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300&h=300&fit=crop',
    category: 'Meat',
    rating: 4.9,
    stock: 35,
    weight: '150g Pack',
  },
  {
    id: 'p7',
    name: 'Milk 1L',
    description: 'Fresh cow milk 1 liter. Rich in calcium and vitamin D.',
    price: 1.5,
    image:
      'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop',
    category: 'Drink',
    rating: 4.4,
    stock: 100,
    weight: '100g Pack',
    tags: ['Tea Fruits'],
  },
  {
    id: 'p8',
    name: 'Orange Juice',
    description: '100% pure orange juice. No added sugar.',
    price: 3.0,
    image:
      'https://images.unsplash.com/photo-1613478225719-02e6902c235f?w=300&h=300&fit=crop',
    category: 'Drink',
    rating: 4.2,
    stock: 70,
    weight: '150g Pack',
    tags: ['Fruits'],
  },
  {
    id: 'p9',
    name: 'Spinach',
    description: 'Fresh green spinach leaves. Rich in iron and nutrients.',
    price: 2.2,
    image:
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=300&fit=crop',
    category: 'Vegetable',
    rating: 4.1,
    stock: 50,
    weight: '50g Pack',
    tags: ['Vegetables'],
  },
  {
    id: 'p10',
    name: 'Tomato',
    description: 'Juicy red tomatoes. Perfect for salads and sauces.',
    price: 2.5,
    image:
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&h=300&fit=crop',
    category: 'Vegetable',
    rating: 4.6,
    stock: 90,
    weight: '100g Pack',
    tags: ['Vegetables'],
  },
  {
    id: 'p11',
    name: 'Green Tea',
    description: 'Refreshing green tea leaves. Rich in antioxidants.',
    price: 4.5,
    image:
      'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=300&h=300&fit=crop',
    category: 'Drink',
    rating: 4.8,
    stock: 120,
    weight: '50g Pack',
    tags: ['Tea Fruits'],
  },
  {
    id: 'p12',
    name: 'Strawberry Pack',
    description: 'Fresh strawberries. Sweet and juicy.',
    price: 5.0,
    image:
      'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=300&h=300&fit=crop',
    category: 'Fruit',
    rating: 4.9,
    stock: 60,
    weight: '100g Pack',
    tags: ['Fruits'],
  },
  {
    id: 'p13',
    name: 'Almond Milk',
    description: 'Healthy almond milk. Lactose-free alternative.',
    price: 3.8,
    image:
      'https://images.unsplash.com/photo-1600783244917-20909693a6f4?w=300&h=300&fit=crop',
    category: 'Drink',
    rating: 4.5,
    stock: 75,
    weight: '100g Pack',
    tags: ['Milk & Drinks'],
  },
  {
    id: 'p14',
    name: 'Cheddar Cheese',
    description: 'Rich and creamy cheddar cheese. Perfect for sandwiches.',
    price: 6.0,
    image:
      'https://images.unsplash.com/photo-1618164435735-413d3b066c9a?w=300&h=300&fit=crop',
    category: 'Diary & Milk',
    rating: 4.7,
    stock: 50,
    weight: '150g Pack',
    tags: ['Milk & Drinks'],
  },
  {
    id: 'p15',
    name: 'Potato',
    description: 'Fresh farm potatoes. Versatile for many dishes.',
    price: 1.5,
    image:
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&h=300&fit=crop',
    category: 'Vegetable',
    rating: 4.2,
    stock: 200,
    weight: '100g Pack',
    tags: ['Vegetables'],
  },
  {
    id: 'p16',
    name: 'Cucumber',
    description: 'Crisp green cucumber. Refreshing and hydrating.',
    price: 1.8,
    image:
      'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=300&h=300&fit=crop',
    category: 'Vegetable',
    rating: 4.3,
    stock: 110,
    weight: '50g Pack',
    tags: ['Vegetables'],
  },
  {
    id: 'p17',
    name: 'Pork Chop',
    description: 'Tender pork chop. Perfect for roasting or grilling.',
    price: 10.5,
    image:
      'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=300&h=300&fit=crop',
    category: 'Meat',
    rating: 4.7,
    stock: 30,
    weight: '150g Pack',
  },
  {
    id: 'p18',
    name: 'Yogurt',
    description: 'Creamy yogurt for breakfast. Contains live cultures.',
    price: 2.2,
    image:
      'https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=300&h=300&fit=crop',
    category: 'Diary & Milk',
    rating: 4.5,
    stock: 90,
    weight: '100g Pack',
    tags: ['Milk & Drinks'],
  },
  {
    id: 'p19',
    name: 'Lettuce',
    description: 'Fresh green lettuce. Crisp and perfect for salads.',
    price: 1.9,
    image:
      'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=300&h=300&fit=crop',
    category: 'Vegetable',
    rating: 4.4,
    stock: 70,
    weight: '50g Pack',
    tags: ['Vegetables'],
  },
  {
    id: 'p20',
    name: 'Mango Pack',
    description: 'Sweet mangoes. Tropical and delicious.',
    price: 4.5,
    image:
      'https://images.unsplash.com/photo-1553279768-865429fa0078?w=300&h=300&fit=crop',
    category: 'Fruit',
    rating: 4.8,
    stock: 50,
    weight: '150g Pack',
    tags: ['Fruits'],
  },
  {
    id: 'p21',
    name: 'Black Tea',
    description: 'Strong black tea. Rich and full-bodied flavor.',
    price: 3.5,
    image:
      'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=300&h=300&fit=crop',
    category: 'Drink',
    rating: 4.6,
    stock: 100,
    weight: '50g Pack',
    tags: ['Tea Fruits'],
  },
  {
    id: 'p22',
    name: 'Watermelon Slice',
    description: 'Juicy watermelon. Perfect for summer.',
    price: 5.0,
    image:
      'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=300&h=300&fit=crop',
    category: 'Fruit',
    rating: 4.7,
    stock: 40,
    weight: '150g Pack',
    tags: ['Fruits'],
  },
  {
    id: 'p23',
    name: 'Pineapple',
    description: 'Fresh tropical pineapple. Sweet and tangy.',
    price: 3.8,
    image:
      'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=300&h=300&fit=crop',
    category: 'Fruit',
    rating: 4.5,
    stock: 60,
    weight: '100g Pack',
    tags: ['Fruits'],
  },
  {
    id: 'p24',
    name: 'Red Pepper',
    description: 'Spicy red pepper. Adds heat to any dish.',
    price: 2.0,
    image:
      'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=300&h=300&fit=crop',
    category: 'Vegetable',
    rating: 4.3,
    stock: 80,
    weight: '50g Pack',
    tags: ['Vegetables', 'Snack & Spice'],
  },
  {
    id: 'p25',
    name: 'Ginger',
    description: 'Fresh ginger root. Aromatic and spicy.',
    price: 3.0,
    image:
      'https://images.unsplash.com/photo-1615485500704-8e990c9900f7?w=300&h=300&fit=crop',
    category: 'Vegetable',
    rating: 4.6,
    stock: 50,
    weight: '50g Pack',
    tags: ['Vegetables', 'Snack & Spice'],
  },
  {
    id: 'p26',
    name: 'Orange',
    description: 'Juicy oranges for breakfast. Rich in vitamin C.',
    price: 2.5,
    image:
      'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=300&h=300&fit=crop',
    category: 'Fruit',
    rating: 4.7,
    stock: 90,
    weight: '100g Pack',
    tags: ['Fruits'],
  },
  {
    id: 'p27',
    name: 'Milk Chocolate',
    description: 'Sweet milk chocolate bars. Smooth and creamy.',
    price: 1.8,
    image:
      'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=300&h=300&fit=crop',
    category: 'Snack & Spice',
    rating: 4.8,
    stock: 150,
    weight: '50g Pack',
    tags: ['Snack & Spice'],
  },
  {
    id: 'p28',
    name: 'Almonds',
    description: 'Crunchy almonds for snacks. Rich in healthy fats.',
    price: 5.0,
    image:
      'https://images.unsplash.com/photo-1508061253366-f7da158c6c20?w=300&h=300&fit=crop',
    category: 'Snack & Spice',
    rating: 4.9,
    stock: 80,
    weight: '100g Pack',
    tags: ['Snack & Spice'],
  },
  {
    id: 'p29',
    name: 'Cabbage',
    description: 'Fresh green cabbage. Great for coleslaw and stir-fry.',
    price: 1.7,
    image:
      'https://images.unsplash.com/photo-1551888761-2a5d71c6c5d8?w=300&h=300&fit=crop',
    category: 'Vegetable',
    rating: 4.2,
    stock: 70,
    weight: '100g Pack',
    tags: ['Vegetables'],
  },
  {
    id: 'p30',
    name: 'Pasta',
    description: 'Italian pasta for cooking. Made from durum wheat.',
    price: 2.5,
    image:
      'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=300&h=300&fit=crop',
    category: 'Snack & Spice',
    rating: 4.5,
    stock: 120,
    weight: '150g Pack',
    tags: ['Snack & Spice'],
  },
];
// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return mockProducts;
    } catch (error) {
      return rejectWithValue('Failed to fetch products');
    }
  },
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      const product = mockProducts.find((p) => p.id === id);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      return rejectWithValue('Failed to fetch product details');
    }
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.filters.category = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.filters.priceRange = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.searchQuery = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {
        category: 'all',
        priceRange: [0, 1000],
        searchQuery: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.products = action.payload;
        },
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductById.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.loading = false;
          state.selectedProduct = action.payload;
        },
      )
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCategory, setPriceRange, setSearchQuery, clearFilters } =
  productSlice.actions;
export default productSlice.reducer;
