import React from 'react';
import { AiOutlineInstagram } from 'react-icons/ai';
import {
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlinePhone,
} from 'react-icons/hi2';
import { IoPaperPlaneSharp } from 'react-icons/io5';
import { PiGlobe } from 'react-icons/pi';
import { RiFacebookLine, RiTwitterXLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constant';

const companyLinks = [
  { label: 'About Us', to: ROUTES.ABOUT },
  { label: 'Shop Products', to: ROUTES.PRODUCTS },
  { label: 'Blog', to: ROUTES.BLOG },
  { label: 'FAQ', to: ROUTES.FAQ },
  { label: 'Login', to: ROUTES.LOGIN },
  { label: 'Create Account', to: ROUTES.SIGNUP },
];

const categoryLinks = [
  { label: 'Diary & Milk', value: 'Diary & Milk' },
  { label: 'Fruit', value: 'Fruit' },
  { label: 'Snack & Spice', value: 'Snack & Spice' },
  { label: 'Drink', value: 'Drink' },
  { label: 'Meat', value: 'Meat' },
  { label: 'Vegetable', value: 'Vegetable' },
];

const socialLinks = [
  { label: 'Facebook', href: 'https://facebook.com', icon: RiFacebookLine },
  { label: 'X', href: 'https://x.com', icon: RiTwitterXLine },
  { label: 'Website', href: 'https://foodzy.example.com', icon: PiGlobe },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: AiOutlineInstagram,
  },
];

const thumbs = [
  '/assets/footer/img_1 (1).png',
  '/assets/footer/img_2 (1).png',
  '/assets/footer/img_3 (1).png',
  '/assets/footer/img_4 (1).png',
  '/assets/footer/img_5.png',
];

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto w-full border-t border-[#f1d8d2] bg-gradient-to-b from-[#fff8f5] via-[#fffaf7] to-white text-slate-700">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div className="space-y-5 text-sm">
            <div className="space-y-1">
              <img
                src="/assets/ui/logo2.png"
                alt="Foodzy logo"
                className="h-16 w-auto sm:h-20"
              />
              <p className="text-sm text-slate-500">
                Built to feel just like the topbar brand across the whole page.
              </p>
            </div>

            <p className="max-w-sm leading-6 text-slate-500">
              Foodzy brings together everyday grocery picks, pantry staples, and
              fresh finds in one calm shopping experience.
            </p>

            <div className="space-y-3 text-slate-500">
              <p className="flex items-start gap-3">
                <HiOutlineMapPin className="mt-0.5 shrink-0 text-lg text-[#ff4c3b]" />
                51 Green St, Huntington Beach, Ontario, NY 11746, USA
              </p>
              <a
                href="mailto:support@foodzy.com"
                className="flex items-center gap-3 transition-colors hover:text-[#ff4c3b]"
              >
                <HiOutlineEnvelope className="shrink-0 text-lg text-[#ff4c3b]" />
                support@foodzy.com
              </a>
              <a
                href="tel:+911234567890"
                className="flex items-center gap-3 transition-colors hover:text-[#ff4c3b]"
              >
                <HiOutlinePhone className="shrink-0 text-lg text-[#ff4c3b]" />
                +91 123 456 7890
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900">Company</h2>
            <ul className="space-y-2.5 text-sm text-slate-500">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="transition-colors hover:text-[#ff4c3b]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900">Categories</h2>
            <ul className="space-y-2.5 text-sm text-slate-500">
              {categoryLinks.map((category) => (
                <li key={category.value}>
                  <Link
                    to={`${ROUTES.PRODUCTS}?category=${encodeURIComponent(category.value)}`}
                    className="transition-colors hover:text-[#ff4c3b]"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Newsletter</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Weekly updates, fresh offers, and quick food inspo straight to
                your inbox.
              </p>
            </div>

            <form
              className="flex overflow-hidden rounded-2xl border border-[#f0d9d3] bg-white shadow-sm"
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full min-w-0 px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="flex items-center justify-center bg-[#ff4c3b] px-4 text-white transition-colors hover:bg-[#e63f2f]"
                aria-label="Subscribe to newsletter"
              >
                <IoPaperPlaneSharp className="text-lg" />
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f0d9d3] bg-white text-slate-600 shadow-sm transition-all hover:border-[#ffb7ae] hover:text-[#ff4c3b]"
                >
                  <Icon className="text-lg" />
                </a>
              ))}
            </div>

            <div className="grid grid-cols-5 gap-2">
              {thumbs.map((src) => (
                <div
                  key={src}
                  className="aspect-square rounded-xl border border-[#f3dfd9] bg-cover bg-center"
                  style={{ backgroundImage: `url("${src}")` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[#f1d8d2] pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright 2026{' '}
            <span className="font-semibold uppercase tracking-[0.2em] text-[#ff4c3b]">
              Cocktails Cusisine
            </span>
            . All rights reserved.
          </p>
          <p>Fresh groceries, quick delivery, and simpler browsing.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
