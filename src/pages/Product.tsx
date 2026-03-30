import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../feature/product/productsSlice';
import { addToCart } from '../feature/cart/cartSlice';
import { RiGridLine } from 'react-icons/ri';
import { TfiLayoutListThumb } from 'react-icons/tfi';

import ProductFilters from '../components/product/ProductFilter';

import ProductCard from '../components/product/ProductCard';
import Pagination from '../components/product/Pagination';

const Product: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.products);

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedWeights, setSelectedWeights] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Dummy filter data (same as before)
  const categories = [
    { name: 'Milk & Drinks', count: 120 },
    { name: 'Diary & Milk', count: 143 },
    { name: 'Snack & Spice', count: 142 },
  ];

  const productCategories = [
    { name: 'Fruit', count: 98, color: 'bg-blue-500' },
    { name: 'Vegetable', count: 132, color: 'bg-pink-500' },
    { name: 'Meat', count: 98, color: 'bg-green-500' },
    { name: 'Drink', count: 121, color: 'bg-yellow-500' },
  ];

  const weights = [
    { label: '50g Pack', count: 152 },
    { label: '100g Pack', count: 125 },
    { label: '150g Pack', count: 98 },
  ];

  const tags = [
    { label: 'Vegetables', count: 4562 },
    { label: 'Tea Fruits', count: 98 },
    { label: 'Fruits', count: 4875 },
  ];

  // Toggle handlers
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const toggleWeight = (weight: string) => {
    setSelectedWeights((prev) =>
      prev.includes(weight)
        ? prev.filter((w) => w !== weight)
        : [...prev, weight],
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };

  // const clearAll = () => {
  //   setSelectedCategories([]);
  //   setSelectedWeights([]);
  //   setSelectedTags([]);
  //   setPriceRange([0, 500]);
  // };

  // Filtering
  const filteredProducts = products
    .filter((p: any) => p.price >= priceRange[0] && p.price <= priceRange[1])
    .filter(
      (p: any) =>
        selectedCategories.length === 0 ||
        selectedCategories.includes(p.category),
    )
    .filter(
      (p: any) =>
        selectedTags.length === 0 ||
        selectedTags.some((tag) => p.tags?.includes(tag)),
    );

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a: any, b: any) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="font-poppins min-h-screen py-8">
      <div className="container mx-auto max-w-6xl max-lg:px-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            <ProductFilters
              categories={categories}
              productCategories={productCategories}
              weights={weights}
              tags={tags}
              selectedCategories={selectedCategories}
              selectedWeights={selectedWeights}
              selectedTags={selectedTags}
              priceRange={priceRange}
              toggleCategory={toggleCategory}
              toggleWeight={toggleWeight}
              toggleTag={toggleTag}
              setPriceRange={setPriceRange}
              // clearAll={clearAll}
            />
          </div>

          {/* Products Section */}
          <div className="col-span-12 lg:col-span-9">
            {/* Header */}{' '}
            <div className="flex justify-between items-center mb-8 bg-gray-100 p-4 rounded-lg">
              {' '}
              <div className="text-sm text-gray-600 font-medium flex items-center">
                {' '}
                <RiGridLine /> <TfiLayoutListThumb /> We found{' '}
                {filteredProducts.length} items for you!{' '}
              </div>{' '}
              <div className="flex items-center gap-3">
                {' '}
                <span className="text-sm text-gray-600">Sort By :</span>{' '}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 bg-white rounded px-3 py-1.5 text-sm focus:outline-none"
                >
                  {' '}
                  <option value="featured">Featured</option>{' '}
                  <option value="price-low">Price: Low to High</option>{' '}
                  <option value="price-high">Price: High to Low</option>{' '}
                  <option value="newest">Newest</option>{' '}
                </select>{' '}
              </div>{' '}
            </div>
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {paginatedProducts.map((product: any) => (
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
