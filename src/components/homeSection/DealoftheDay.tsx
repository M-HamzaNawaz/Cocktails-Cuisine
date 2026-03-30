import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { addToCart } from '../../feature/cart/cartSlice';
import { LuShoppingCart } from 'react-icons/lu';

interface Deal {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  brand: string;
  price: number;
  originalPrice: number;
  image: string;
  discount?: number;
}

interface DealsOfTheDayProps {
  deals?: Deal[];
}

const DealsOfTheDay: React.FC<DealsOfTheDayProps> = ({ deals }) => {
  const dispatch = useAppDispatch();

  // Default deals data
  const defaultDeals: Deal[] = [
    {
      id: 'B1',
      name: 'Seeds of Change Organic Quinoa, Brown, & Red Rice',
      rating: 1,
      reviewCount: 3,
      brand: 'NestFood',
      price: 32.85,
      originalPrice: 33.8,
      image: '/assets/deals/img_1.png',
      discount: 3,
    },
    {
      id: 'B2',
      name: 'Perdue Simply Smart Organics Gluten Free',
      rating: 1,
      reviewCount: 3,
      brand: 'Old El Paso',
      price: 24.85,
      originalPrice: 26.8,
      image: '/assets/deals/img_2.png',
      discount: 7,
    },
    {
      id: 'B3',
      name: 'Signature Wood-Fired Mushroom and Caramelized',
      rating: 1,
      reviewCount: 3,
      brand: 'Progresso',
      price: 12.85,
      originalPrice: 13.8,
      image: '/assets/deals/img_3.png',
      discount: 7,
    },
    {
      id: 'B4',
      name: 'Simply Lemonade with Raspberry Juice',
      rating: 1,
      reviewCount: 3,
      brand: 'Yoplait',
      price: 15.85,
      originalPrice: 16.8,
      image: '/assets/deals/img_4.png',
      discount: 6,
    },
  ];

  const displayDeals = deals || defaultDeals;

  const handleAddToCart = (deal: Deal) => {
    const cartItem = {
      id: deal.id,
      name: deal.name,
      description: deal.brand,
      price: deal.price,
      image: deal.image,
      category: 'Deals',
      rating: deal.rating,
      stock: 100,
    };
    dispatch(addToCart(cartItem));
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Deals Of The Day</h2>
          <Link
            to="/deals"
            className="text-gray-600 hover:text-emerald-500 transition flex items-center gap-1"
          >
            All Deals
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {/* Deals Grid */}
        <div className="flex flex-wrap gap-6 ">
          {displayDeals.map((deal) => (
            <div
              key={deal.id}
              className="
                        relative bg-white overflow-hidden transition-all duration-300
                        w-full max-w-[350px] h-[470px]
                        mx-auto
                        lg:w-[350px] lg:h-[470px]
                        rounded-[15px]
                    "
            >
              {/* Background Image */}
              <img
                src={deal.image}
                alt={deal.name}
                className="
      absolute left-0 w-full h-full object-contain
      -top-8 sm:-top-10 lg:-top-12
    "
              />

              {/* Floating Info Panel */}
              <div
                className="
                            absolute bg-white p-5 shadow-md rounded-[10px]

                            w-[90%] left-1/2 -translate-x-1/2 bottom-4
                            sm:w-[85%]

                            lg:w-[300px] lg:h-[192.38px]
                            lg:top-[245.17px] lg:left-[26.5px]
                            lg:translate-x-0 lg:bottom-auto
                            "
              >
                {/* Product Name */}
                <h3 className="text-base font-semibold text-gray-900 leading-snug mb-2 line-clamp-2">
                  {deal.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-2.5">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span className="text-sm font-medium text-gray-700">
                    {deal.rating.toFixed(1)}
                  </span>
                </div>

                {/* Brand */}
                <p className="text-sm text-gray-500 mb-4">
                  By{' '}
                  <span className="text-emerald-600 font-medium">
                    {deal.brand}
                  </span>
                </p>

                {/* Price + Button */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-emerald-600 text-2xl font-bold">
                      ${deal.price.toFixed(2)}
                    </span>
                    {deal.originalPrice && (
                      <span className="text-gray-400 text-base line-through">
                        ${deal.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddToCart(deal)}
                    className="
          bg-red-500 hover:bg-red-600 text-white
          text-sm font-medium px-5 py-2.5
          rounded-lg transition-colors
          flex items-center gap-2 shadow-sm
        "
                  >
                    <LuShoppingCart />
                    Add
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

export default DealsOfTheDay;
