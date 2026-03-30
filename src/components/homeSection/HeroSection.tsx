// import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from 'react-icons/fa6';
import { HiArrowRight } from 'react-icons/hi';

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-[400px] md:min-h-[600px] overflow-hidden bg-gradient-to-br from-yellow-900/40 via-neutral-800 to-black">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('/assets/hero/Texture-01.png')] bg-cover bg-center opacity-20" />

      <div className="relative container mx-auto h-full px-6 md:px-10 lg:px-14 z-10">
        <div className="flex justify-center h-full items-end ">
          {/* LEFT CONTENT */}
          <div className="relative flex flex-col items-start justify-center pt-12 md:pt-20">
            {/* Heading Image */}
            <div className="relative mb-6">
              <img
                src="/assets/hero/Heading-Text.png"
                alt="Super Delicious Roast Turkey"
                className="w-[360px] sm:w-[420px] md:w-[520px] object-contain"
              />

              {/* Chili Left */}
              <img
                src="/assets/hero/Chili-01.png"
                alt="Chili"
                className="absolute -top-8 -left-8 md:-top-12 md:-left-12 -rotate-12
                           w-[80px] md:w-[130px]"
              />
            </div>

            {/* CTA BUTTON */}
            <Link
              to="/products"
              className="group inline-flex items-center rounded-full
                         shadow-[0_10px_30px_rgba(0,0,0,0.35)]
                         hover:shadow-[0_15px_40px_rgba(0,0,0,0.45)]
                         transition-all duration-300"
            >
              <span className="bg-black text-white p-4 rounded-l-full flex items-center justify-center">
                <HiArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition" />
              </span>
              <span className="bg-yellow-300 text-black font-extrabold px-7 py-4 rounded-r-full text-sm md:text-base">
                ORDER NOW
              </span>
            </Link>
          </div>

          {/* RIGHT CONTENT */}
          <div className="relative flex justify-center md:justify-end mt-10 md:mt-0">
            {/* Turkey Image */}
            <div className="relative">
              <img
                src="/assets/hero/roast_turkey.png"
                alt="Roast Turkey"
                className="object-contain
                           w-[320px] sm:w-[380px] md:w-[480px] lg:w-[460px]
                           -mt-6 md:-mt-14
                           drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
              />

              {/* Chili Right */}
              <img
                src="/assets/hero/Chili-02.png"
                alt="Chili"
                className="absolute bottom-4 -right-4 md:bottom-12 md:-right-12 rotate-12
                           w-[80px] md:w-[130px]"
              />
            </div>

            {/* SOCIAL & CONTACT */}
            <div className="absolute bottom-6 md:-bottom-10 right-4 flex flex-col items-end gap-2 opacity-40">
              <div className="flex gap-2 md:gap-3">
                {[FaFacebookF, FaXTwitter, FaInstagram, FaYoutube].map(
                  (Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="bg-white p-2 rounded-full text-black
                                 hover:bg-yellow-300 transition"
                    >
                      <Icon className="w-4 h-4 md:w-5 md:h-5" />
                    </a>
                  ),
                )}
              </div>

              <p className="text-xs md:text-sm font-bold text-yellow-500">
                Call Us: +658-7854-9634
              </p>
              <p className="text-xs text-gray-400">Type your website here</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
