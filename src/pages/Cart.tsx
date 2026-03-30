import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { removeFromCart, updateQuantity } from '../feature/cart/cartSlice';
import Button from '../components/ui/Button';
import PopularProducts from '../components/ui/PopularProducts';
import Wrapper from '../components/container/Wrapper';

const money = (n: number) => `$${Number(n).toFixed(2)}`;

// Define the type for PopularProduct

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items } = useAppSelector((state) => state.cart);

  const handleRemove = (id: string) => dispatch(removeFromCart(id));

  const setQty = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  if (items.length === 0) {
    return (
      <Wrapper>
        <div className="min-h-screen  text-slate-800">
          <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">
              Add some products to get started!
            </p>
            <Link to="/products">
              <Button>Shop Now</Button>
            </Link>

            <div className="mt-16 text-left"></div>
          </div>
          <PopularProducts />
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="min-h-screen bg-[#fafafa] text-slate-800">
        <div className="w-full bg-[#ff4c3b] text-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-sm lg:px-0">
            <span>Cart</span>
            <span className="text-xs opacity-90">
              Home <span className="mx-1">/</span> Cart
            </span>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-10 lg:px-0">
          <div className="overflow-hidden rounded-md border border-slate-200 bg-white">
            <div className="grid grid-cols-[2.2fr_1fr_1fr_1fr_0.6fr] bg-slate-100 px-6 py-4 text-sm font-semibold text-slate-700">
              <div>Product</div>
              <div className="text-center">Price</div>
              <div className="text-center">Quantity</div>
              <div className="text-center">Total</div>
              <div className="text-right">Action</div>
            </div>

            <div>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[2.2fr_1fr_1fr_1fr_0.6fr] items-center px-6 py-6"
                >
                  <div className="flex items-center gap-6">
                    <div className="h-16 w-16 overflow-hidden rounded-md border border-slate-200 bg-white">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <p className="truncate text-sm font-medium text-slate-700">
                      {item.name}
                    </p>
                  </div>

                  <div className="text-center text-sm text-slate-700">
                    {money(item.price)}
                  </div>

                  <div className="flex justify-center">
                    <div className="flex items-center overflow-hidden rounded-md border border-slate-200 bg-white">
                      <button
                        type="button"
                        onClick={() => setQty(item.id, item.quantity + 1)}
                        className="px-3 py-2 text-sm hover:bg-slate-50"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>

                      <span className="min-w-10 px-3 text-center text-sm">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => setQty(item.id, item.quantity - 1)}
                        className="px-3 py-2 text-sm hover:bg-slate-50"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="text-center text-sm text-slate-700">
                    {money(Number(item.price) * item.quantity)}
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="text-slate-600 hover:text-[#ff4c3b]"
                      aria-label="Remove item"
                    >
                      <FiTrash2 className="text-lg" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <Link
              to="/products"
              className="text-sm text-slate-600 underline hover:text-slate-800"
            >
              Continue Shopping
            </Link>

            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="rounded-md bg-[#ff4c3b] px-10 py-3 text-sm font-semibold text-white hover:bg-[#e63f2f]"
            >
              Check Out
            </button>
          </div>

          <div className="mt-16">
            <PopularProducts />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Cart;
