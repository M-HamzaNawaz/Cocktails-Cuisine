// import React from 'react';
import Wrapper from '../container/Wrapper';

const PopularCategories = () => {
  const categoriesInfo = [
    {
      title: 'Main Dish',
      items: '(86 dishes)',
      image: '/assets/categories/cat1.png',
    },
    {
      title: 'Break fast',
      items: '(16 dishes)',
      image: '/assets/categories/cat2.png',
    },
    {
      title: 'Dessert',
      items: '(483 dishes)',
      image: '/assets/categories/cat3.png',
    },
    {
      title: 'Browse All',
      items: '(264 dishes)',
      image: '/assets/categories/cat4.png',
    },
    {
      title: 'Breakfast food',
      items: '(361 Items)',
      image: '/assets/categories/cat5.png',
    },
  ];

  return (
    <Wrapper className=" flex flex-col items-center justify-center gap-10 px-4 md:px-8 py-16">
      <p className="text-md uppercase font-bold text-red-600 tracking-wide">
        customer favorites
      </p>

      <h3 className="text-4xl md:text-5xl font-bold text-gray-900">
        Popular Categories
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-7xl mt-8">
        {categoriesInfo.map((cat, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 cursor-pointer group"
          >
            <div
              className="bg-gradient-to-br from-gray-50 to-gray-200 rounded-full p-4 mb-4 
                 hover:scale-110 
                transition-all duration-300 flex items-center justify-center"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-20 h-20 object-contain drop-shadow-lg"
              />
            </div>

            <h4 className="text-lg font-semibold text-gray-800 text-center mb-1">
              {cat.title}
            </h4>

            <p className="text-sm text-gray-500">{cat.items}</p>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default PopularCategories;
