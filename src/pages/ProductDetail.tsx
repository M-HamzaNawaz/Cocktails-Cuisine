import React, { useEffect, useState } from 'react';
import { IoLeafOutline, IoShieldCheckmarkOutline, IoStar, IoTrailSignOutline } from 'react-icons/io5';
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
  setPriceRange,
  toggleCategory,
  toggleTag,
  toggleWeight,
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

  const product =
    selectedProduct?.id === id
      ? selectedProduct
      : products.find((item) => item.id === id);

  useEffect(() => {
    if (!product) {
      return;
    }

    setQuantity(1);
    setSelectedWeight(product.weight ?? '200g');
  }, [product?.id, product?.weight]);

  if (loading && !product) {
    return (
      <Wrapper className="px-4 py-16">
        <div className="flex justify-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-red-500" />
        </div>
      </Wrapper>
    );
  }

  if (!product) {
    return (
      <Wrapper className="px-4 py-16">
        <div className="rounded-[32px] border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-slate-800">Product not found</h2>
          <p className="mb-8 text-sm text-slate-500">
            The item you opened is not available right now.
          </p>
          <Button onClick={() => navigate(ROUTES.PRODUCTS)}>Back to Products</Button>
        </div>
      </Wrapper>
    );
  }

  const handleAddToCart = () => {
    const clampedQuantity = Math.min(product.stock, Math.max(1, quantity));
    dispatch(addToCart({ product, quantity: clampedQuantity }));
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

  const detailItems = [
    { label: 'Brand', value: 'Foodzy Fresh' },
    { label: 'Flavor', value: 'Farm Fresh' },
    { label: 'Type', value: product.category },
    { label: 'Weight', value: product.weight ?? 'Standard pack' },
    { label: 'Stock', value: `${product.stock} available` },
  ];

  const highlights = [
    {
      icon: IoLeafOutline,
      title: 'Fresh quality',
      text: 'Handpicked produce with clean sourcing.',
    },
    {
      icon: IoShieldCheckmarkOutline,
      title: 'Safe checkout',
      text: 'Simple ordering and protected cart flow.',
    },
    {
      icon: IoTrailSignOutline,
      title: 'Fast dispatch',
      text: 'Quick prep and doorstep delivery support.',
    },
  ];

  const weightOptionsForProduct = ['50g', '80g', '120g', product.weight ?? '200g'];

  return (
    <Wrapper className="px-4 py-8 sm:py-10">
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <button
          type="button"
          onClick={() => navigate(ROUTES.HOME)}
          className="transition hover:text-red-500"
        >
          Home
        </button>
        <span>/</span>
        <button
          type="button"
          onClick={() => navigate(ROUTES.PRODUCTS)}
          className="transition hover:text-red-500"
        >
          Products
        </button>
        <span>/</span>
        <span className="font-medium text-slate-700">{product.name}</span>
      </div>

      <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="xl:sticky xl:top-6 xl:self-start">
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
        </aside>

        <div className="space-y-8">
          <section className="overflow-hidden rounded-[34px] border border-slate-200 bg-gradient-to-br from-white via-[#fffaf7] to-[#fff5ef] shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
            <div className="grid gap-8 p-5 sm:p-7 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:p-9">
              <div className="rounded-[26px] border border-slate-200 bg-white p-3 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
                <div className="relative overflow-hidden rounded-[22px] border border-slate-200 bg-white">
                  <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                      Fresh stock
                    </span>
                    <span className="h-2 w-2 rounded-full bg-red-400" />
                  </div>

                  <div className="relative bg-[linear-gradient(180deg,#fff8f3_0%,#ffffff_100%)] p-4 sm:p-5">
                    <div className="absolute inset-x-8 bottom-5 h-8 rounded-full bg-slate-200/70 blur-xl" />
                    <div className="overflow-hidden rounded-[18px] border border-[#f3dfd3] bg-[#fff4ec]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="relative z-10 aspect-square w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                      />
                    </div>
                  </div>

                  <div className="flex items-end justify-between px-4 pb-4 pt-1">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Selected pack
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {selectedWeight}
                      </p>
                    </div>
                    <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      Premium
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-red-500">
                    {product.category}
                  </span>
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    In stock
                  </span>
                </div>

                <h1 className="max-w-2xl text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                  {product.name}
                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }, (_, index) => (
                      <IoStar
                        key={`${product.id}-star-${index}`}
                        className={
                          index < Math.round(product.rating)
                            ? 'text-amber-400'
                            : 'text-slate-200'
                        }
                      />
                    ))}
                  </div>
                  <span className="font-medium text-slate-700">
                    {product.rating.toFixed(1)} rating
                  </span>
                  <span className="text-slate-300">|</span>
                  <span>{product.stock} units ready</span>
                </div>

                <p className="mt-6 max-w-2xl text-[15px] leading-7 text-slate-600">
                  {product.description}
                </p>

                <div className="mt-7 flex flex-wrap items-end gap-3">
                  <span className="text-4xl font-bold tracking-tight text-slate-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="pb-1 text-lg text-slate-400 line-through">
                    ${(product.price * 1.2).toFixed(2)}
                  </span>
                  <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
                    Save 20%
                  </span>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                  {detailItems.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 px-4 py-3"
                    >
                      <span className="text-sm font-semibold text-slate-500">{item.label}</span>
                      <span className="text-sm font-medium text-slate-800">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <span className="mb-3 block text-sm font-semibold text-slate-700">
                    Size / Weight
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {weightOptionsForProduct.map((weight) => (
                      <button
                        key={weight}
                        type="button"
                        onClick={() => setSelectedWeight(weight)}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                          selectedWeight === weight
                            ? 'border-red-500 bg-red-500 text-white shadow-[0_12px_24px_rgba(255,76,59,0.22)]'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-red-200 hover:text-red-500'
                        }`}
                      >
                        {weight}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="inline-flex w-fit items-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-5 py-3 text-lg text-slate-600 transition hover:bg-slate-50"
                    >
                      -
                    </button>
                    <span className="min-w-[72px] border-x border-slate-200 px-4 py-3 text-center font-semibold text-slate-800">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-5 py-3 text-lg text-slate-600 transition hover:bg-slate-50"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex flex-1 flex-col gap-3 sm:flex-row">
                    <Button
                      size="lg"
                      onClick={handleAddToCart}
                      className="flex-1 rounded-full bg-[#ff4c3b] text-base text-white shadow-[0_18px_35px_rgba(255,76,59,0.25)] hover:bg-[#e63f2f]"
                    >
                      Add To Cart
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={handleAddToWishlist}
                      className="rounded-full border-red-200 px-8 text-base text-red-500 hover:bg-red-50"
                    >
                      Wishlist
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[26px] border border-slate-200 bg-white px-5 py-5 shadow-sm"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-xl text-red-500">
                    <Icon />
                  </div>
                  <h3 className="text-base font-semibold text-slate-800">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{item.text}</p>
                </div>
              );
            })}
          </section>

          <section className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <ProductTabs />
          </section>
        </div>
      </div>

      <PopularProductsSection />
    </Wrapper>
  );
};

export default ProductDetails;
