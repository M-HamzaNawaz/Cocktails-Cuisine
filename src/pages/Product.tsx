import React, { useEffect, useState } from 'react';
import { RiGridLine } from 'react-icons/ri';
import { TfiLayoutListThumb } from 'react-icons/tfi';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import ProductFilters from '../components/product/ProductFilter';
import Pagination from '../components/product/Pagination';
import ProductCard from '../components/product/ProductCard';
import PageBanner from '../components/ui/PageBanner';
import { useToast } from '../components/ui/ToastProvider';
import { addToCart } from '../feature/cart/cartSlice';
import { selectFilteredProducts } from '../feature/product/productSelectors';
import {
  fetchProducts,
  clearFilters,
  setPriceRange,
  setSortBy,
  toggleCategory,
  toggleTag,
  toggleWeight,
} from '../feature/product/productsSlice';
import type { Product as ProductType } from '../types/product';
import { buildProductFilterOptions } from '../utils/buildProductFilterOptions';
import { SUCCESS_MESSAGES } from '../utils/constant';

const Product: React.FC = () => {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();
  const { products, loading, filters } = useAppSelector((state) => state.products);
  const filteredProducts = useAppSelector(selectFilteredProducts);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;
  const {
    categories: sidebarCategories,
    weights: weightOptions,
    tags: tagOptions,
    maxPrice,
  } = buildProductFilterOptions(products);
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / itemsPerPage),
  );

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    const categoryParam = searchParams.get('category');

    if (!categoryParam || products.length === 0) {
      return;
    }

    const normalizedCategoryParam = categoryParam.trim().toLowerCase();
    const hasMatchingCategory = products.some(
      (product) => product.category.trim().toLowerCase() === normalizedCategoryParam,
    );

    if (!hasMatchingCategory) {
      return;
    }

    const isOnlySelectedCategory =
      filters.selectedCategories.length === 1 &&
      filters.selectedCategories[0].trim().toLowerCase() === normalizedCategoryParam;

    if (isOnlySelectedCategory) {
      return;
    }

    dispatch(clearFilters());
    dispatch(toggleCategory(categoryParam));
  }, [dispatch, filters.selectedCategories, products, searchParams]);

  useEffect(() => {
    if (products.length > 0 && filters.priceRange[1] > maxPrice) {
      dispatch(setPriceRange([0, maxPrice]));
    }
  }, [dispatch, filters.priceRange, maxPrice, products.length]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    filters.priceRange,
    filters.selectedCategories,
    filters.selectedTags,
    filters.selectedWeights,
    filters.searchQuery,
    filters.sortBy,
  ]);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleAddToCart = (product: ProductType) => {
    dispatch(addToCart({ product }));
    showToast(`${product.name} ${SUCCESS_MESSAGES.PRODUCT_ADDED_TO_CART.toLowerCase()}`);
  };

  return (
    <div className="font-poppins min-h-screen">
      <PageBanner title="Products" />
      <div className="container mx-auto max-w-6xl max-lg:px-6">
        <div className="grid grid-cols-12 gap-6 py-8">
          <div className="col-span-12 space-y-6 lg:col-span-3">
            <ProductFilters
              categories={sidebarCategories}
              weights={weightOptions}
              tags={tagOptions}
              selectedCategories={filters.selectedCategories}
              selectedWeights={filters.selectedWeights}
              selectedTags={filters.selectedTags}
              priceRange={filters.priceRange}
              maxPrice={maxPrice}
              toggleCategory={(value) => dispatch(toggleCategory(value))}
              toggleWeight={(value) => dispatch(toggleWeight(value))}
              toggleTag={(value) => dispatch(toggleTag(value))}
              setPriceRange={(nextRange) => dispatch(setPriceRange(nextRange))}
              clearFilters={() => dispatch(clearFilters())}
            />
          </div>

          <div className="col-span-12 lg:col-span-9">
            <div className="mb-8 flex items-center justify-between rounded-lg bg-gray-100 p-4">
              <div className="flex items-center text-sm font-medium text-gray-600">
                <RiGridLine />
                <TfiLayoutListThumb />
                <span className="ml-2">
                  We found {filteredProducts.length} items for you!
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Sort By:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    dispatch(
                      setSortBy(
                        e.target.value as
                          | 'featured'
                          | 'price-low'
                          | 'price-high'
                          | 'newest',
                      ),
                    )
                  }
                  className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm focus:outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="py-12 text-center">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-red-500" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      addToCart={handleAddToCart}
                    />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
