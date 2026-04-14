import { useState } from 'react';
import { HomePageData } from '../../data/data'; // keep as-is if alias is configured
import { BsSend } from 'react-icons/bs';
import Wrapper from '../container/Wrapper';

const NewsletterFeatures = () => {
  const [email, setEmail] = useState('');

  const { features } = HomePageData.newsletter;

  const handleSubscribe = () => {
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <section className="w-full">
      <Wrapper className="mx-auto max-w-7xl px-4 py-12 sm:px-8 md:py-16">
        {/* HERO / Newsletter Section */}
        <div className="relative overflow-hidden rounded-[32px] bg-[#111111] shadow-[0_24px_60px_rgba(17,17,17,0.22)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.12),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(245,62,50,0.25),_transparent_35%)]" />
          <div className="relative grid grid-cols-1 gap-10 px-6 py-8 sm:px-8 md:px-10 md:py-10 lg:grid-cols-2 lg:items-center lg:px-12">
            {/* Left Section */}
            <div className="z-10 space-y-6 font-quicksand">
              <div>
                <h2 className="mb-3 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                  Stay home & get your daily
                  <br className="hidden sm:block" /> needs from our shop
                </h2>
                <p className="max-w-xl text-sm text-gray-300 md:text-base">
                  Start your daily shopping with{' '}
                  <span className="text-green-400 font-semibold">
                    Nest Mart
                  </span>
                </p>
              </div>

              {/* Email Subscription */}
              <div className="relative w-full max-w-xl">
                <div className="flex flex-col gap-3 rounded-[28px] border border-white/10 bg-white/95 p-2 shadow-[0_20px_40px_rgba(0,0,0,0.18)] sm:flex-row sm:items-center">
                  <div className="flex min-w-0 flex-1 items-center rounded-full bg-slate-50 px-4 ring-1 ring-slate-200">
                    <BsSend className="h-5 w-5 flex-shrink-0 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="min-w-0 flex-1 bg-transparent px-3 py-3.5 text-sm text-gray-700 placeholder-gray-400 outline-none md:text-base"
                    />
                  </div>

                  <button
                    onClick={handleSubscribe}
                    className="flex min-h-[52px] items-center justify-center rounded-full bg-[#F53E32] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#df3328] sm:px-7 md:text-base"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Right Section - Banner Image */}
            <div className="hidden items-center justify-end lg:flex">
              <img
                src="/assets/newsletter/newsletter-banner.png"
                alt="newsletter-banner"
                className="h-auto w-[540px] object-contain xl:w-[630px]"
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 text-gray-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Icon */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eef9f0]">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="h-10 w-10 object-contain"
                />
              </div>

              {/* Text */}
              <div className="min-w-0 flex-1">
                <h3 className="mb-0.5 text-sm font-semibold leading-5 text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-xs leading-5 text-gray-500">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  );
};

export default NewsletterFeatures;
