import { FC, useState } from 'react';
import { CiMenuBurger, CiPhone } from 'react-icons/ci';
import { IoCloseOutline } from 'react-icons/io5';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import CommonDropdown from '../ui/CommonDropdown';
import { ROUTES } from '../../utils/constant';

const productOptions = [
  { label: 'Products', value: '' },
  { label: 'All Products', value: ROUTES.PRODUCTS },
];

const pageOptions = [
  { label: 'Pages', value: '' },
  { label: 'Login', value: ROUTES.LOGIN },
  { label: 'Register', value: ROUTES.SIGNUP },
];

const navLinks = [
  { label: 'Home', to: ROUTES.HOME },
  { label: 'Blog', to: ROUTES.BLOG },
  { label: 'About', to: ROUTES.ABOUT },
];

const Topbar: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const productDefaultValue = location.pathname.startsWith(ROUTES.PRODUCTS)
    ? ROUTES.PRODUCTS
    : '';
  const pageDefaultValue =
    location.pathname === ROUTES.LOGIN || location.pathname === ROUTES.SIGNUP
      ? location.pathname
      : '';

  const handleNavigate = (value: string) => {
    if (!value) {
      return;
    }

    navigate(value);
    setIsMenuOpen(false);
  };

  return (
    <div className="border-b border-slate-200 bg-gradient-to-r from-white via-[#fff7f5] to-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="min-w-0">
            <p className="truncate text-[10px] font-semibold uppercase tracking-[0.2em] text-red-400 sm:text-[11px] sm:tracking-[0.24em]">
              Cocktails Cuisine
            </p>
            <p className="truncate text-xs font-semibold text-slate-700 sm:text-sm">
              Fresh picks and quick routes
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-red-50 text-red-500'
                    : 'text-slate-600 hover:bg-red-50 hover:text-red-500'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <CommonDropdown
            options={productOptions}
            defaultValue={productDefaultValue}
            onChange={handleNavigate}
            className="min-w-[148px] border-red-100 bg-white"
          />

          <CommonDropdown
            options={pageOptions}
            defaultValue={pageDefaultValue}
            onChange={handleNavigate}
            className="min-w-[132px] border-red-100 bg-white"
          />
        </div>

        <div className="hidden sm:block">
          <div className="rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
            <span className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50 text-red-500">
                <CiPhone size={16} />
              </span>
              +123 (456) 7890
            </span>
          </div>
        </div>

        <button
          type="button"
          className="rounded-2xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm transition-colors duration-200 hover:border-red-200 hover:text-red-500 lg:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={
            isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
          }
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <IoCloseOutline size={20} />
          ) : (
            <CiMenuBurger size={18} />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="w-full border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3 rounded-3xl border border-slate-100 bg-[#fffaf8] p-4 shadow-sm">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-2xl border px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'border-red-100 bg-white text-red-500'
                      : 'border-transparent text-slate-700 hover:border-red-100 hover:bg-white hover:text-red-500'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}

            <CommonDropdown
              options={productOptions}
              defaultValue={productDefaultValue}
              onChange={handleNavigate}
              className="bg-white"
            />

            <CommonDropdown
              options={pageOptions}
              defaultValue={pageDefaultValue}
              onChange={handleNavigate}
              className="bg-white"
            />

            <div className="mt-1 flex items-center gap-2 border-t border-slate-200 pt-4 text-sm font-medium text-slate-600 sm:hidden">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-500">
                <CiPhone size={16} />
              </span>
              +123 (456) 7890
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Topbar;
