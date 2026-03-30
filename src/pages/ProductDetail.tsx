import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addToCart } from '../feature/cart/cartSlice';
import { addToWishlist } from '../feature/wishlist/wishlistSlice';
import { fetchProducts } from '../feature/product/productsSlice';
import Wrapper from '../components/container/Wrapper';
import ProductFilters from '../components/product/ProductFilter';
import ProductTabs from '../components/product/ProductTabs';
import PopularProductsSection from '../components/ui/PopularProducts';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { products, loading } = useAppSelector((state) => state.products);

  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState<string>('200kg');

  // ---------- Filter states ----------
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedWeights, setSelectedWeights] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  // ---------- Dummy filter data ----------
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

  // ---------- Fetch products ----------
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const product = products.find((p) => p.id === id);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Button onClick={() => navigate('/products')}>Back to Products</Button>
      </div>
    );
  }

  // ---------- Handlers ----------
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product));
  };

  // ---------- Render ----------
  return (
    <Wrapper className="">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className="w-64 flex-shrink-0">
            <ProductFilters
              categories={categories}
              productCategories={productCategories}
              weights={weights}
              tags={tags}
              selectedCategories={selectedCategories}
              selectedWeights={selectedWeights}
              selectedTags={selectedTags}
              priceRange={priceRange}
              toggleCategory={(name) =>
                setSelectedCategories((prev) =>
                  prev.includes(name)
                    ? prev.filter((c) => c !== name)
                    : [...prev, name],
                )
              }
              toggleWeight={(name) =>
                setSelectedWeights((prev) =>
                  prev.includes(name)
                    ? prev.filter((w) => w !== name)
                    : [...prev, name],
                )
              }
              toggleTag={(name) =>
                setSelectedTags((prev) =>
                  prev.includes(name)
                    ? prev.filter((t) => t !== name)
                    : [...prev, name],
                )
              }
              setPriceRange={setPriceRange}
            />
          </div>

          {/* Product Content */}
          <div className="flex-1">
            <div className="flex gap-8">
              {/* Product Image */}
              <div className="w-1/2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full rounded-lg shadow-lg"
                />
              </div>

              {/* Product Info */}
              <div className="w-1/2">
                <div className="text-sm text-gray-500 mb-2">
                  {product.category}
                </div>
                <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

                <div className="flex items-center mb-6">
                  <span className="text-yellow-500 text-xl">⭐⭐⭐⭐⭐</span>
                  <span className="ml-2 text-gray-600">(75 Review)</span>
                </div>

                {/* Product Details List */}
                <div className="space-y-3 mb-6">
                  <div className="flex">
                    <span className="w-24 font-semibold text-gray-700">
                      Brand
                    </span>
                    <span className="text-gray-600">ESTA BETTERU CO</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 font-semibold text-gray-700">
                      Flavour
                    </span>
                    <span className="text-gray-600">Super Saver Pack</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 font-semibold text-gray-700">
                      Diet Type
                    </span>
                    <span className="text-gray-600">Vegetarian</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 font-semibold text-gray-700">
                      Weight
                    </span>
                    <span className="text-gray-600">200 Grams</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 font-semibold text-gray-700">
                      Speciality
                    </span>
                    <span className="text-gray-600">
                      Gluten Free, Sugar Free
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-24 font-semibold text-gray-700">
                      Info
                    </span>
                    <span className="text-gray-600">
                      Egg Free, Allergen-Free
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-24 font-semibold text-gray-700">
                      Items
                    </span>
                    <span className="text-gray-600">1</span>
                  </div>
                </div>

                {/* Price Section */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-blue-600">
                    ${product.price}
                  </span>
                  <span className="ml-2 text-gray-400 line-through">
                    ${(product.price * 1.2).toFixed(2)}
                  </span>
                </div>

                {/* Size/Weight Selector */}
                <div className="mb-6">
                  <span className="font-semibold text-gray-700 mr-4">
                    Size/Weight:
                  </span>
                  <div className="inline-flex gap-2">
                    {['50kg', '80kg', '120kg', '200kg'].map((weight) => (
                      <button
                        key={weight}
                        onClick={() => setSelectedWeight(weight)}
                        className={`px-4 py-2 border rounded transition-colors ${
                          selectedWeight === weight
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {weight}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 mb-6">
                  <label className="font-semibold text-gray-700">
                    Quantity:
                  </label>
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-gray-100 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-6 py-2 border-x min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(Math.min(product.stock, quantity + 1))
                      }
                      className="px-4 py-2 hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    size="lg"
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Add To Cart
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleAddToWishlist}
                    className="px-6"
                  >
                    ❤️ Wishlist
                  </Button>
                </div>
              </div>
            </div>

            {/* Product Tabs */}
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
