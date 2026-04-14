import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Wrapper from '../components/container/Wrapper';
import ProductFilters from '../components/product/ProductFilter';
import ProductTabs from '../components/product/ProductTabs';
import Button from '../components/ui/Button';
import PopularProductsSection from '../components/ui/PopularProducts';
import { addToCart } from '../feature/cart/cartSlice';
import {
  fetchProductById,
  fetchProducts,
  toggleCategory,
  toggleTag,
  toggleWeight,
  setPriceRange,
} from '../feature/product/productsSlice';
import { addToWishlist } from '../feature/wishlist/wishlistSlice';
import { buildProductFilterOptions } from '../utils/buildProductFilterOptions';
import { ROUTES } from '../utils/constant';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { products, selectedProduct, loading, filters } = useAppSelector(
    (state) => state.products,
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState<string>('200g');
  const {
    categories: sidebarCategories,
    weights: weightOptions,
    tags: tagOptions,
    maxPrice,
  } = buildProductFilterOptions(products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  const product = selectedProduct ?? products.find((item) => item.id === id);

  if (loading && !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-red-500" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="mb-4 text-2xl font-bold">Product not found</h2>
        <Button onClick={() => navigate('/products')}>Back to Products</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product));
  };

  const openFilteredProducts = () => {
    navigate(ROUTES.PRODUCTS);
  };

  const handleCategoryFilter = (value: string) => {
    dispatch(toggleCategory(value));
    openFilteredProducts();
  };

  const handleWeightFilter = (value: string) => {
    dispatch(toggleWeight(value));
    openFilteredProducts();
  };

  const handleTagFilter = (value: string) => {
    dispatch(toggleTag(value));
    openFilteredProducts();
  };

  const handlePriceRange = (nextRange: [number, number]) => {
    dispatch(setPriceRange(nextRange));
    openFilteredProducts();
  };

  return (
    <Wrapper className="">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="lg:w-[280px] lg:flex-shrink-0">
            <ProductFilters
              categories={sidebarCategories}
              weights={weightOptions}
              tags={tagOptions}
              selectedCategories={filters.selectedCategories}
              selectedWeights={filters.selectedWeights}
              selectedTags={filters.selectedTags}
              priceRange={filters.priceRange}
              maxPrice={maxPrice}
              toggleCategory={handleCategoryFilter}
              toggleWeight={handleWeightFilter}
              toggleTag={handleTagFilter}
              setPriceRange={handlePriceRange}
            />
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-8 xl:flex-row">
              <div className="xl:w-1/2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full rounded-lg shadow-lg"
                />
              </div>

              <div className="xl:w-1/2">
                <div className="mb-2 text-sm text-gray-500">{product.category}</div>
                <h1 className="mb-4 text-4xl font-bold">{product.name}</h1>

                <div className="mb-6 flex items-center">
                  <span className="text-xl text-yellow-500">
                    {'★'.repeat(Math.round(product.rating))}
                  </span>
                  <span className="ml-2 text-gray-600">
                    ({product.rating.toFixed(1)} rating)
                  </span>
                </div>

                <div className="mb-6 space-y-3">
                  <div className="flex">
                    <span className="w-24 font-semibold text-gray-700">Brand</span>
                    <span className="text-gray-600">Foodzy Fresh</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 font-semibold text-gray-700">Flavor</span>
                    <span className="text-gray-600">Farm Fresh</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 font-semibold text-gray-700">Type</span>
                    <span className="text-gray-600">{product.category}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 font-semibold text-gray-700">Weight</span>
                    <span className="text-gray-600">{product.weight ?? 'Standard pack'}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 font-semibold text-gray-700">Stock</span>
                    <span className="text-gray-600">{product.stock} available</span>
                  </div>
                </div>

                <p className="mb-6 text-gray-600">{product.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-blue-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="ml-2 text-gray-400 line-through">
                    ${(product.price * 1.2).toFixed(2)}
                  </span>
                </div>

                <div className="mb-6">
                  <span className="mr-4 font-semibold text-gray-700">Size/Weight:</span>
                  <div className="inline-flex gap-2">
                    {['50g', '80g', '120g', product.weight ?? '200g'].map((weight) => (
                      <button
                        key={weight}
                        type="button"
                        onClick={() => setSelectedWeight(weight)}
                        className={`rounded border px-4 py-2 transition-colors ${
                          selectedWeight === weight
                            ? 'border-blue-500 bg-blue-500 text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {weight}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6 flex items-center gap-4">
                  <label className="font-semibold text-gray-700">Quantity:</label>
                  <div className="flex items-center rounded-lg border">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 transition-colors hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="min-w-[60px] border-x px-6 py-2 text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-4 py-2 transition-colors hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    size="lg"
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Add To Cart
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleAddToWishlist}
                    className="px-6"
                  >
                    Wishlist
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <ProductTabs />
            </div>
          </div>
        </div>
      </div>
      <PopularProductsSection />
    </Wrapper>
  );
};

export default ProductDetails;
