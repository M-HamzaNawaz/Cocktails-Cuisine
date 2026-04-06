import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addToCart } from '../../feature/cart/cartSlice';
import { IoMdArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { LuShoppingCart } from 'react-icons/lu';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { IoIosArrowRoundForward } from 'react-icons/io';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  soldCount: number;
  totalStock: number;
  badge?: 'Best Sale' | 'Sale' | 'Best Sale';
}

const DailyBestSells: React.FC = () => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<'featured' | 'popular' | 'new'>(
    'featured',
  );

  // Mock products data
  const products: Product[] = [
    {
      id: 'BS1',
      name: 'All Natural Italian-Style Chicken Meatballs',
      category: 'Hodo Foods',
      price: 238.85,
      originalPrice: 245.8,
      image:
        'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400',
      rating: 4.0,
      soldCount: 90,
      totalStock: 120,
      badge: 'Best Sale',
    },
    {
      id: 'BS2',
      name: "Angie's Boomchickapop Sweet and salty",
      category: 'Hodo Foods',
      price: 238.85,
      originalPrice: 245.8,
      image:
        'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400',
      rating: 4.0,
      soldCount: 90,
      totalStock: 120,
      badge: 'Sale',
    },
    {
      id: 'BS3',
      name: 'Foster Farms Takeout Crispy Classic',
      category: 'Hodo Foods',
      price: 238.85,
      originalPrice: 245.8,
      image:
        'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400',
      rating: 4.0,
      soldCount: 90,
      totalStock: 120,
      badge: 'Best Sale',
    },
    {
      id: 'BS4',
      name: 'Blue Diamond Almonds Lightly Salted',
      category: 'Hodo Foods',
      price: 238.85,
      originalPrice: 245.8,
      image:
        'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=400',
      rating: 4.0,
      soldCount: 90,
      totalStock: 120,
      badge: 'Sale',
    },
  ];

  const handleAddToCart = (product: Product) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      description: product.category,
      price: product.price,
      image: product.image,
      category: product.category,
      rating: product.rating,
      stock: product.totalStock,
    };
    dispatch(addToCart({ product: cartItem }));
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Best Sale':
        return 'bg-emerald-500';
      case 'Sale':
        return 'bg-sky-400';
      default:
        return 'bg-pink-500';
    }
  };

  return (
    <section className="py-16  bg-white">
      <div className="container  mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Daily Best Sells</h2>

          {/* Tabs */}
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('featured')}
              className={`text-sm font-medium pb-1 transition ${
                activeTab === 'featured'
                  ? 'text-emerald-500 border-b-2 border-emerald-500'
                  : 'text-gray-600 hover:text-emerald-500'
              }`}
            >
              Featured
            </button>
            <button
              onClick={() => setActiveTab('popular')}
              className={`text-sm font-medium pb-1 transition ${
                activeTab === 'popular'
                  ? 'text-emerald-500 border-b-2 border-emerald-500'
                  : 'text-gray-600 hover:text-emerald-500'
              }`}
            >
              Popular
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`text-sm font-medium pb-1 transition ${
                activeTab === 'new'
                  ? 'text-emerald-500 border-b-2 border-emerald-500'
                  : 'text-gray-600 hover:text-emerald-500'
              }`}
            >
              New added
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Featured Banner */}
          <div className="lg:col-span-1 relative rounded-2xl overflow-hidden h-full min-h-[450px]">
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600"
              alt="Featured banner"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
            <div className="relative h-full flex flex-col justify-start gap-16 p-12 text-white">
              <h3 className="text-3xl font-bold mb-4 leading-tight">
                Bring nature
                <br />
                into your
                <br />
                home
              </h3>
              <Link to="/products">
                <button className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-md font-medium transition w-fit">
                  Shop Now <IoMdArrowForward />
                </button>
              </Link>
            </div>
          </div>

          {/* Product Cards */}
          {products.map((product, index) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition group relative"
            >
              {/* Badge */}
              {product.badge && (
                <div
                  className={`absolute top-0 left-0 ${getBadgeColor(
                    product.badge,
                  )} text-white text-xs font-semibold px-3 py-1.5 rounded-br-2xl z-10`}
                >
                  {product.badge}
                </div>
              )}

              {/* Navigation Arrows (only show on first and last items) */}
              {index === 0 && (
                <button className="absolute left-4 top-1/3 -translate-y-1/2 bg-gray-100 rounded-full p-2 shadow-md hover:shadow-lg transition text-2xl z-10">
                  <IoIosArrowRoundBack />
                </button>
              )}
              {index === products.length - 1 && (
                <button className="absolute right-4 top-1/3 -translate-y-1/2 bg-gray-100 rounded-full p-2 shadow-md hover:shadow-lg transition text-2xl z-10">
                  <IoIosArrowRoundForward />
                </button>
              )}

              <div className="p-5">
                {/* Product Image */}
                <div className="flex justify-center items-center h-48 mb-4 ">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-48 object-contain group-hover:scale-105 transition"
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <p className="text-xs text-gray-500">{product.category}</p>
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 min-h-[40px]">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 ">
                    {[...Array(1)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    ))}
                    {/* <span className="text-xs text-gray-500 ml-1">
                      ({product.rating})
                    </span> */}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-emerald-500 text-lg font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-gray-400 text-sm line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  </div>

                  {/* Stock Progress */}
                  <div className="space-y-3">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-red-500 h-1.5 rounded-full"
                        style={{
                          width: `${(product.soldCount / product.totalStock) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>
                        Sold {product.soldCount}/{product.totalStock}
                      </span>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-red-500 hover:bg-red-600 flex justify-center items-center gap-1 text-white py-2.5 rounded-md font-medium transition"
                  >
                    <LuShoppingCart className="text-xl" /> Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DailyBestSells;
