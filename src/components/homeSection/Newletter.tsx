import { useState } from 'react';
import { HomePageData } from '../../data/data'; // keep as-is if alias is configured
import { BsSend } from 'react-icons/bs';

const NewsletterFeatures = () => {
  const [email, setEmail] = useState('');

  const { features } = HomePageData.newsletter;

  const handleSubscribe = () => {
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <section className="w-full ">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-16 space-y-10">
        {/* HERO / Newsletter Section */}
        <div className="relative bg-black rounded-3xl overflow-hidden   ">
          <div className="relative bg-black grid grid-cols-1 lg:grid-cols-2 gap-10 items-start pt-8 px-8 md:px-12 md:pt-12">
            {/* Left Section */}
            <div className="space-y-6 z-10 font-quicksand">
              <div>
                <h2 className="text-xl text-white md:text-3xl lg:text-4xl font-bold leading-snug mb-3">
                  Stay home & get your daily <br /> needs from our shop
                </h2>
                <p className="text-gray-400 text-sm md:text-base">
                  Start your daily shopping with{' '}
                  <span className="text-green-400 font-semibold">
                    Nest Mart
                  </span>
                </p>
              </div>

              {/* Email Subscription */}
              <div className="relative max-w-md w-full">
                <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden  border-gray-200">
                  <div className="pl-5 pr-3 py-1">
                    <BsSend className="w-5 h-5 text-gray-400" />
                  </div>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 py-4 px-2 text-gray-700 placeholder-gray-400 focus:outline-none text-sm md:text-base"
                  />

                  <button
                    onClick={handleSubscribe}
                    className="bg-[#F53E32] 
                    text-white font-semibold 
                    px-6 md:px-8 py-4 
                    rounded-full 
                    transition-all duration-300 
                    mr-6 text-sm md:text-base"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Right Section - Banner Image */}
            <div className="hidden lg:flex justify-end items-center">
              <img
                src="/assets/newsletter/newsletter-banner.png"
                alt="newsletter-banner"
                className="object-contain w-[630px] h-auto"
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-0">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 bg-gray-100 text-gray-900 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-200"
            >
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 shrink-0">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-10 h-10 object-contain"
                />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold mb-0.5 truncate">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-500 truncate">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsletterFeatures;
