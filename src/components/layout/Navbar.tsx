import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { CiHeart, CiSearch } from 'react-icons/ci';
import { IoPersonOutline } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../feature/auth/authSlice';
import { setSearchQuery } from '../../feature/product/productsSlice';
import { ROUTES } from '../../utils/constant';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const cartItems = useAppSelector((state) =>
    Array.isArray(state.cart.items) ? state.cart.items : [],
  );
  const wishlistItems = useAppSelector((state) =>
    Array.isArray(state.wishlist.items) ? state.wishlist.items : [],
  );
  const searchQuery = useAppSelector((state) => state.products.filters.searchQuery);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSearch = () => {
    dispatch(setSearchQuery(localSearch));
    navigate(ROUTES.PRODUCTS);
  };

  return (
    <nav className="bg-white text-black shadow-lg">
      <div className="border-b-2 border-red-500">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center justify-between gap-4">
            <Link to={ROUTES.HOME}>
              <img
                src="/assets/ui/navbar_logo.png"
                alt="Foodzy logo"
                className="h-10 w-auto sm:h-12"
              />
            </Link>

            <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
              <Link
                to={ROUTES.WISHLIST}
                className="rounded-full border border-slate-200 p-2 hover:text-red-500"
                aria-label="Wishlist"
              >
                <div className="relative">
                  <CiHeart className="text-lg" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] text-white">
                      {wishlistItems.length}
                    </span>
                  )}
                </div>
              </Link>

              <Link
                to={ROUTES.CART}
                className="rounded-full border border-slate-200 p-2 hover:text-red-500"
                aria-label="Cart"
              >
                <div className="relative">
                  <FiShoppingCart className="text-lg" />
                  {cartItems.length > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] text-white">
                      {cartItems.length}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>

          <div className="order-3 flex w-full justify-center lg:order-2 lg:flex-1">
            <div className="flex w-full max-w-2xl items-stretch overflow-hidden rounded border border-slate-300 bg-white">
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
                placeholder="Search for items..."
                className="min-w-0 flex-1 bg-slate-50 px-4 py-2.5 text-xs text-slate-700 outline-none placeholder:text-slate-400 sm:text-sm"
              />
              <select className="hidden border-l border-slate-200 bg-white px-3 text-xs text-slate-600 outline-none md:block">
                <option>All Categories</option>
                <option>Fruits &amp; Vegetables</option>
                <option>Dairy &amp; Bakery</option>
                <option>Meat &amp; Seafood</option>
              </select>
              <button
                type="button"
                onClick={handleSearch}
                className="flex items-center justify-center bg-[#ff4c3b] px-4 text-sm font-semibold text-white hover:bg-[#e63f2f] sm:px-5"
                aria-label="Search products"
              >
                <CiSearch className="text-lg font-bold" />
              </button>
            </div>
          </div>

          <div className="order-2 flex flex-wrap items-center justify-between gap-3 lg:order-3 lg:justify-end">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="max-w-[120px] truncate text-sm">{user?.name}</span>
                <button type="button" onClick={handleLogout} className="text-sm hover:text-red-500">
                  Logout
                </button>
              </div>
            ) : (
              <Link to={ROUTES.LOGIN} className="hover:text-red-500">
                <div className="flex items-center gap-1">
                  <IoPersonOutline />
                  <p className="text-sm font-medium">Account</p>
                </div>
              </Link>
            )}

            <div className="hidden items-center gap-4 sm:flex">
              <Link to={ROUTES.WISHLIST} className="hover:text-red-500">
                <div className="flex items-center gap-1 text-sm">
                  <div className="relative">
                    <CiHeart />
                    {wishlistItems.length > 0 && (
                      <span className="absolute -right-1 -top-2 flex h-3 min-w-3 items-center justify-center rounded-full bg-red-500 px-1 text-xs text-white">
                        {wishlistItems.length}
                      </span>
                    )}
                  </div>
                  <p>Wishlist</p>
                </div>
              </Link>

              <Link to={ROUTES.CART} className="hover:text-red-500">
                <div className="flex items-center gap-1 text-sm">
                  <div className="relative">
                    <FiShoppingCart />
                    {cartItems.length > 0 && (
                      <span className="absolute -right-2 -top-2 flex h-3 min-w-3 items-center justify-center rounded-full bg-red-500 px-1 text-xs text-white">
                        {cartItems.length}
                      </span>
                    )}
                  </div>
                  <p>Cart</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
