import React from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { useAppDispatch } from '../../app/hooks';
import { addToCart } from '../../feature/cart/cartSlice';

const money = (n: number) => `$${Number(n).toFixed(2)}`;

interface Popular {
  id: string;
  name: string;
  category: string;
  rating: number;
  price: number;
  oldPrice?: number;
  image: string;
  description: string;
}

interface PopularDeals {
  populars?: Popular[];
}

const PopularProductsSection: React.FC<PopularDeals> = ({ populars }) => {
  const dispatch = useAppDispatch();

  const popularProducts: Popular[] = [
    {
      id: 'p1',
      name: 'Best snacks with hazel nut mix pack 200gm',
      category: 'Snacks',
      rating: 4.5,
      price: 120.25,
      oldPrice: 123.25,
      image: '/assets/products/prod_2.png',
      description: 'A mix of hazel nuts and snacks, perfect for snacking.',
    },
    {
      id: 'p2',
      name: 'Sweet snacks crunchy nut mix 250gm pack',
      category: 'Snacks',
      rating: 5.0,
      price: 100.0,
      oldPrice: 110.0,
      image: '/assets/products/prod_1.png',
      description: 'Crunchy nut mix, packed with sweetness and flavor.',
    },
    {
      id: 'p3',
      name: 'Best snacks with hazel nut mix pack 200gm',
      category: 'Snacks',
      rating: 4.5,
      price: 120.25,
      oldPrice: 123.25,
      image: '/assets/products/prod_5.png',
      description: 'A mix of hazel nuts and snacks, perfect for snacking.',
    },
    {
      id: 'p4',
      name: 'Sweet snacks crunchy nut mix 250gm pack',
      category: 'Snacks',
      rating: 5.0,
      price: 100.0,
      oldPrice: 110.0,
      image: '/assets/products/prod_13.png',
      description: 'Crunchy nut mix, packed with sweetness and flavor.',
    },
  ];

  const displayPopular = populars || popularProducts;

  const handleAddtoCart = (popular: Popular) => {
    const cartItem = {
      id: popular.id,
      name: popular.name,
      description: popular.description,
      price: popular.price,
      image: popular.image,
      category: 'Deals',
      rating: popular.rating,
      stock: 100,
    };
    dispatch(addToCart({ product: cartItem }));
  };

  return (
    <section className="my-14">
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-slate-800">
          Popular Products
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et viverra maecenas accumsan lacus
          vel facilisis.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {displayPopular.map((p) => (
          <div
            key={p.id}
            className="overflow-hidden rounded-md border border-slate-200 bg-white"
          >
            <div className="relative px-6 pt-6">
              <div className="flex h-56 items-center justify-center rounded bg-slate-50">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-44 w-auto object-contain"
                />
              </div>

              {/* Add to cart circle */}
              <div className="absolute left-1/2 top-[248px] -translate-x-1/2">
                <button
                  type="button"
                  onClick={() => handleAddtoCart(p)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:text-[#ff4c3b]"
                  aria-label="Add to cart"
                >
                  <FiShoppingBag />
                </button>
              </div>
            </div>

            <div className="px-6 pb-6 pt-10 text-center">
              <p className="text-xs text-slate-500">{p.category}</p>
              <div className="mt-2 flex flex-col items-center gap-1">
                <div className="h-[2px] w-12 rounded bg-[#ff4c3b]" />
                <p className="text-xs text-slate-400">
                  ({p.rating.toFixed(1)})
                </p>
              </div>

              <h3 className="mt-4 line-clamp-2 text-sm font-medium text-slate-800">
                {p.name}
              </h3>

              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="text-sm font-semibold text-[#ff4c3b]">
                  {money(p.price)}
                </span>
                {typeof p.oldPrice === 'number' && (
                  <span className="text-xs text-slate-400 line-through">
                    {money(p.oldPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularProductsSection;
