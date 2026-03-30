// import React from 'react';
import Wrapper from '../container/Wrapper';
import { HomePageData } from '../../data/data';

const WhyChooseUs = () => {
  const { features } = HomePageData.chooseus;

  return (
    <Wrapper className="max-w-7xl mx-auto py-16 px-4 sm:px-8 md:px-12 lg:px-14">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-start">
        {/* Left Section - Image */}
        <div className="relative flex justify-center">
          <div className="relative rounded-2xl overflow-hidden max-w-md w-full">
            <img
              src="/assets/chooseus/banner.png"
              alt="Fresh salad with salmon"
              className="object-cover w-full h-full"
            />

            {/* Soft Glow Elements */}
            {/* <div className="absolute -top-6 -left-6 w-28 h-28 bg-red-500 rounded-full blur-2xl opacity-20"></div>
            <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-orange-400 rounded-full blur-3xl opacity-20"></div> */}
          </div>
        </div>

        {/* Right Section - Content */}
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
            Why People Choose Us?
          </h2>

          {/* Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex gap-4 items-start group p-5 rounded-2xl  border-gray-200 shadow-md transition-all duration-300 hover:shadow-lg"
              >
                {/* Icon */}
                <div
                  className="bg-gradient-to-br from-gray-50 to-gray-200 rounded-full p-4 mb-4 
                 hover:scale-110 
                transition-all duration-300 flex items-center justify-center"
                >
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-[45px] h-[45px] object-contain "
                  />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default WhyChooseUs;
