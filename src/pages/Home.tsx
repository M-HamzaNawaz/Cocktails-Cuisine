import React from 'react';
import HeroSection from '../components/homeSection/HeroSection';
import PopularCategories from '../components/homeSection/PopularCategories';
import WhyChooseUs from '../components/homeSection/WhyChooseUs';
import NewsletterFeatures from '../components/homeSection/Newletter';
import DailyBestSells from '../components/homeSection/DailyBestSales';
import StandoutDishes from '../components/homeSection/StandoutDishes';
import DealsOfTheDay from '../components/homeSection/DealoftheDay';

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products */}
      <PopularCategories />
      {/* DailyBestSales */}
      <DailyBestSells />
      {/* StandoutDishes */}
      <StandoutDishes />
      {/* Deal of the Day  */}
      <DealsOfTheDay />
      {/* Why Choose US  */}
      <WhyChooseUs />
      {/* New letter */}
      <NewsletterFeatures />
    </div>
  );
};

export default Home;
