import React from 'react';
import { AiOutlineInstagram } from 'react-icons/ai';
import { IoPaperPlaneSharp } from 'react-icons/io5';
import { PiGlobe } from 'react-icons/pi';
import { RiFacebookLine, RiTwitterXLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
const Footer: React.FC = () => {
  const thumbs = [
    '/assets/footer/img_1 (1).png',
    '/assets/footer/img_2 (1).png',
    '/assets/footer/img_3 (1).png',
    '/assets/footer/img_4 (1).png',
    '/assets/footer/img_5.png',
  ];
  return (
    <div>
      <footer className="mt-auto w-full bg-gray-100 text-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-10 lg:px-0">
          <div className="grid gap-8 md:grid-cols-4">
            {/* Brand / contact */}
            <div className="space-y-3 text-[13px]">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100">
                  <span className="text-lg">
                    <img src="/assets/ui/footer_logo.png" alt="Foodzy Logo" />
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-black">Foodzy</p>
                  <p className="text-[11px] text-[#777777]">
                    A Treasure of Tastes
                  </p>
                </div>
              </div>
              <p className="text-[#777777]">
                FoodTrue is the biggest market of grocery products. Get your
                daily needs from our store.
              </p>
              <div className="space-y-1 text-[#777777]">
                <p className="flex gap-2">
                  <span className="mt-[2px] text-[#ff4c3b]">📍</span>
                  51 Green St. Huntington, Ohaio beach, Ontario, NY 11746 KT
                  4783, USA
                </p>
                <p className="flex gap-2">
                  <span className="mt-[2px] text-[#ff4c3b]">✉</span>
                  example@email.com
                </p>
                <p className="flex gap-2">
                  <span className="mt-[2px] text-[#ff4c3b]">📞</span>
                  +91 123 4567890
                </p>
              </div>
            </div>

            {/* Company links */}
            <div className="space-y-4">
              <h5 className="font-bold text-black">Company</h5>
              <ul className=" text-[#777777] space-y-2 text-sm">
                <li>
                  <Link to="/about" className="hover:text-[#ff4c3b]">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-[#ff4c3b]">
                    Delivery Information
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ff4c3b]">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ff4c3b]">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ff4c3b]">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ff4c3b]">
                    Support Center
                  </a>
                </li>
              </ul>
            </div>

            {/* Category links */}
            <div className="space-y-4">
              <h5 className="text-black font-bold">Category</h5>
              <ul className="text-[#777777] space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-[#ff4c3b]">
                    Dairy & Bakery
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ff4c3b]">
                    Fruits & Vegetable
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ff4c3b]">
                    Snack & Spice
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ff4c3b]">
                    Juice & Drinks
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ff4c3b]">
                    Chicken & Meat
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#ff4c3b]">
                    Fast Food
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="text-[13px]">
              <h3 className="text-sm font-bold text-black">
                Subscribe Our Newsletter
              </h3>
              <form
                className="mt-4 flex items-stretch"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Search here..."
                  className="w-full   px-4 py-2.5  border-gray-300  text-black outline-none placeholder:text-black"
                />
                <button className=" bg-white px-4 hover:bg-[#e63f2f]">
                  <IoPaperPlaneSharp className="text-black" />
                </button>
              </form>
              {/* Social + thumbnails (simplified placeholders) */}
              <div className="mt-4 flex items-center gap-1 text-black">
                <button className="p-2  bg-white ">
                  <RiFacebookLine className="text-2xl" />
                </button>
                <button className="p-2 bg-white ">
                  <RiTwitterXLine className="text-2xl" />
                </button>
                <button className="p-2 bg-white ">
                  <PiGlobe className="text-2xl" />
                </button>
                <button className="p-2 bg-white ">
                  <AiOutlineInstagram className="text-2xl" />
                </button>
              </div>
              <div className="mt-4 flex gap-2">
                {thumbs.map((src, idx) => (
                  <div
                    key={idx}
                    className="h-10 w-20 rounded-md bg-cover bg-center"
                    style={{ backgroundImage: `url("${src}")` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-[#7777] pt-4 text-center text-[11px] text-slate-500">
            © 2026 <span className="font-semibold text-[#ff4c3b]">foodzy</span>,
            All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
