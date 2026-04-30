import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getProductById, getProducts } from '../../srevices/productApi';
import type { Product } from '../../types/product';

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  filters: {
    selectedCategories: string[];
    selectedWeights: string[];
    selectedTags: string[];
    priceRange: [number, number];
    searchQuery: string;
    sortBy: 'featured' | 'price-low' | 'price-high' | 'newest';
  };
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  filters: {
    selectedCategories: [],
    selectedWeights: [],
    selectedTags: [],
    priceRange: [0, 1000],
    searchQuery: '',
    sortBy: 'featured',
  },
};
// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      return await getProducts();
    } catch {
      return rejectWithValue('Failed to fetch products');
    }
  },
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string, { rejectWithValue }) => {
    try {
      return await getProductById(id);
    } catch {
      return rejectWithValue('Failed to fetch product details');
    }
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleCategory: (state, action: PayloadAction<string>) => {
      const value = action.payload;
      state.filters.selectedCategories = state.filters.selectedCategories.includes(
        value,
      )
        ? state.filters.selectedCategories.filter((item) => item !== value)
        : [...state.filters.selectedCategories, value];
    },
    toggleWeight: (state, action: PayloadAction<string>) => {
      const value = action.payload;
      state.filters.selectedWeights = state.filters.selectedWeights.includes(value)
        ? state.filters.selectedWeights.filter((item) => item !== value)
        : [...state.filters.selectedWeights, value];
    },
    toggleTag: (state, action: PayloadAction<string>) => {
      const value = action.payload;
      state.filters.selectedTags = state.filters.selectedTags.includes(value)
        ? state.filters.selectedTags.filter((item) => item !== value)
        : [...state.filters.selectedTags, value];
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.filters.priceRange = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.searchQuery = action.payload;
    },
    setSortBy: (
      state,
      action: PayloadAction<'featured' | 'price-low' | 'price-high' | 'newest'>,
    ) => {
      state.filters.sortBy = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {
        selectedCategories: [],
        selectedWeights: [],
        selectedTags: [],
        priceRange: [0, 1000],
        searchQuery: '',
        sortBy: 'featured',
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
        state.selectedProduct = null;
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
        state.selectedProduct = null;
        state.error = action.payload as string;
      });
  },
});

export const {
  toggleCategory,
  toggleWeight,
  toggleTag,
  setPriceRange,
  setSearchQuery,
  setSortBy,
  clearFilters,
} = productSlice.actions;
export default productSlice.reducer;
