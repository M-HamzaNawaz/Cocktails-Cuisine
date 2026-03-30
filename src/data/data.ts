import { Headphones, Package, Shield, Truck } from 'lucide-react';

// Home Page data
export const HomePageData = {
  // why choose us section
  chooseus: {
    features: [
      {
        title: 'Convenient and Reliable',
        description:
          "Whether you're in the office or at home, we offer convenient, fast, and reliable delivery, making mealtimes hassle-free.",
        image: '/assets/chooseus/01.png',
      },
      {
        title: 'Variety of Options',
        description:
          'From hearty meals to light snacks, we offer a wide range of options to suit every taste and craving.',
        image: '/assets/chooseus/02.png',
      },
      {
        title: 'Eat Burger',
        description:
          'Our burgers are grilled to perfection, with juicy patties and flavorful toppings that make every bite a culinary experience.',
        image: '/assets/chooseus/03.png',
      },
    ],
  },
  // Newsletter section
  newsletter: {
    features: [
      {
        title: 'Best prices & offers',
        description: 'Orders $50 or more',
        image: '/assets/newsletter/icon-1.png',
      },
      {
        title: 'Free delivery',
        description: '24/7 amazing services',
        image: '/assets/newsletter/icon-2.png',
      },
      {
        title: 'Great daily deal',
        description: 'When you sign up',
        image: '/assets/newsletter/icon-3.png',
      },
      {
        title: 'Wide assortment',
        description: 'Mega Discounts',
        image: '/assets/newsletter/icon-4.png',
      },
      {
        title: 'Easy returns',
        description: 'Within 30 days',
        image: '/assets/newsletter/icon-5.png',
      },
    ],
  },
};

// About Page data

export const AboutPageData = {
  //stats
  stats: [
    { number: '0.1', unit: 'k', label: 'Vendors' },
    { number: '23', unit: 'k', label: 'Customers' },
    { number: '2', unit: 'k', label: 'Products' },
  ],
  //features
  features: [
    {
      icon: Package,
      title: 'Product Packing',
      description: 'Lorem ipsum dolor sit amet, the consectetur adipisicing',
    },
    {
      icon: Headphones,
      title: '24X7 Support',
      description: 'Lorem ipsum dolor sit amet, the consectetur adipisicing',
    },
    {
      icon: Truck,
      title: 'Delivery in 5 Days',
      description: 'Lorem ipsum dolor sit amet, the consectetur adipisicing',
    },
    {
      icon: Shield,
      title: 'Payment Secure',
      description: 'Lorem ipsum dolor sit amet, the consectetur adipisicing',
    },
  ],
};
