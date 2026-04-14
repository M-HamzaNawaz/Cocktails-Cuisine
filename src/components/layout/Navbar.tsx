import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut, FiShoppingCart } from 'react-icons/fi';
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
  const userName = user?.name?.trim() ?? 'Account';
  const userInitial = userName.charAt(0).toUpperCase();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSearch = () => {
    dispatch(setSearchQuery(localSearch));
    navigate(ROUTES.PRODUCTS);
  };

  const actionLinkClass =
    'group flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50 hover:text-red-500';

  return (
    <nav className="border-b border-red-100 bg-gradient-to-b from-white via-[#fffaf7] to-white text-black shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 lg:gap-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center justify-between gap-4">
            <Link to={ROUTES.HOME}>
              <img
                src="/assets/ui/navbar_logo.png"
                alt="Foodzy logo"
                className="h-10 w-auto sm:h-12"
              />
            </Link>

          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 lg:justify-end">
            {isAuthenticated ? (
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-400 text-sm font-semibold text-white shadow-sm ring-4 ring-red-50">
                  {userInitial}
                </div>
                <div className="hidden min-w-0 sm:block">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-red-400">
                    Signed In
                  </p>
                  <p className="max-w-[140px] truncate text-sm font-semibold text-slate-700">
                    {userName}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                  aria-label="Logout"
                  title="Logout"
                >
                  <FiLogOut className="text-base" />
                </button>
              </div>
            ) : (
              <Link
                to={ROUTES.LOGIN}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-500">
                  <IoPersonOutline className="text-base" />
                </span>
                <span>Account</span>
              </Link>
            )}

            <div className="flex items-center gap-2 sm:gap-3">
              <Link to={ROUTES.WISHLIST} className={actionLinkClass}>
                <div className="relative">
                  <CiHeart className="text-lg" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                      {wishlistItems.length}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline">Wishlist</span>
              </Link>

              <Link to={ROUTES.CART} className={actionLinkClass}>
                <div className="relative">
                  <FiShoppingCart className="text-base" />
                  {cartItems.length > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                      {cartItems.length}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline">Cart</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex w-full justify-center">
          <div className="grid w-full max-w-5xl gap-3 rounded-[28px] border border-red-100 bg-white/90 p-2 shadow-[0_18px_50px_rgba(255,76,59,0.08)] backdrop-blur sm:grid-cols-[minmax(0,1fr)_auto]">
            <div className="flex min-w-0 items-center rounded-[22px] bg-slate-50 ring-1 ring-inset ring-slate-200 transition focus-within:ring-red-200">
              <span className="pl-4 text-slate-400">
                <CiSearch className="text-xl" />
              </span>
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
                className="min-w-0 flex-1 rounded-[22px] bg-transparent px-3 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>
            <button
              type="button"
              onClick={handleSearch}
              className="flex min-h-[48px] items-center justify-center rounded-[20px] bg-[#ff4c3b] px-5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(255,76,59,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#e63f2f]"
              aria-label="Search products"
            >
              <span className="flex items-center gap-2">
                <CiSearch className="text-lg font-bold" />
                <span className="sm:hidden">Search</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
