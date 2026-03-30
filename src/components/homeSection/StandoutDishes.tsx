import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { toggleWishlist } from '../../feature/wishlist/wishlistSlice';
import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';

interface Dish {
  id: string;
  name: string;
  description: string;
  image: string;
  category?: string;
  price?: number;
}

interface StandoutDishesProps {
  dishes?: Dish[];
}

const StandoutDishes: React.FC<StandoutDishesProps> = ({ dishes }) => {
  const dispatch = useAppDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Default dishes data
  const defaultDishes: Dish[] = [
    {
      id: 'S1',
      name: 'Fattoush salad',
      description: 'Description of the item',
      image:
        'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500',
      category: 'Salads',
      price: 12.99,
    },
    {
      id: 'S2',
      name: 'Vegetable salad',
      description: 'Description of the item',
      image:
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500',
      category: 'Salads',
      price: 10.99,
    },
    {
      id: 'S3',
      name: 'Egg vegi salad',
      description: 'Description of the item',
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500',
      category: 'Salads',
      price: 13.99,
    },
    {
      id: 'S4',
      name: 'Caesar salad',
      description: 'Description of the item',
      image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500',
      category: 'Salads',
      price: 11.99,
    },
  ];

  const displayDishes = dishes || defaultDishes;
  const itemsPerView = 3;
  const maxIndex = Math.max(0, displayDishes.length - itemsPerView);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const toggleFavorite = (dishId: string) => {
    const dish = displayDishes.find((d) => d.id === dishId);
    if (!dish) return;

    // Update local favorites state for UI toggle
    const newFavorites = new Set(favorites);
    if (newFavorites.has(dishId)) {
      newFavorites.delete(dishId);
    } else {
      newFavorites.add(dishId);
    }
    setFavorites(newFavorites);
    // Sync with Redux using toggleWishlist
    dispatch(
      toggleWishlist({
        id: dish.id,
        name: dish.name,
        description: dish.description,
        price: dish.price || 0,
        image: dish.image,
        category: dish.category || 'Menu',
        rating: 4.5,
        stock: 100,
      }),
    );
  };

  const visibleDishes = displayDishes.slice(
    currentIndex,
    currentIndex + itemsPerView,
  );

  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <p className="text-red-500 uppercase text-sm font-semibold tracking-wider mb-3">
            SPECIAL DISHES
          </p>
          <div className="flex justify-between items-end">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Standout Dishes
              <br />
              From Our Menu
            </h2>

            {/* Navigation Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
                  currentIndex === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
                  currentIndex >= maxIndex
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-red-500 text-white hover:bg-red-600 shadow-md'
                }`}
              >
                <svg
                  className="w-5 h-5"
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
              </button>
            </div>
          </div>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleDishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-white rounded-3xl p-6 h-[500px] shadow-xl transition-all duration-300 group relative"
            >
              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(dish.id)}
                className={`absolute top-0 right-0 z-10 w-16 h-14 rounded-bl-[40px]  flex items-center justify-center transition-all duration-300 bg-red-500 text-2xl  shadow-md ${
                  favorites.has(dish.id) ? '  text-white ' : '  text-white '
                }`}
              >
                {favorites.has(dish.id) ? <FaHeart /> : <FaRegHeart />}
              </button>

              {/* Dish Image */}
              <div className="mb-6 flex justify-center">
                <div className="w-64 h-64 rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Dish Info */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {dish.name}
                </h3>
                <p className="text-gray-500 text-sm">{dish.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Indicator */}
        {/* {displayDishes.length > itemsPerView && (
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-red-500'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )} */}
      </div>
    </section>
  );
};

export default StandoutDishes;
