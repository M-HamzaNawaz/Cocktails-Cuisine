// ProductTabs.tsx
import React, { useState } from 'react';

const ProductTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'description' | 'information' | 'review'
  >('description');

  const renderContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="space-y-4">
            <p className="text-gray-600 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error in
              vero sapiente odio, error dolore vero temporibus consequatur,
              nobis veniam odit dignissimos consectetur quae in perferendis
              doloribusdebitiis corporis, eaque dicta, repellat amet, illum
              adipisci vel perferendis dolor! Quis vel consequuntur repellat
              distinctio rem. Corrupti ratione alias odio, error dolore
              temporibus consequatur, nobis veniam odit laborum dignissimos
              consectetur quae vero in perferendis provident quis.
            </p>

            <h4 className="font-semibold mt-4">Packaging & Delivery</h4>
            <hr className="my-2 border-gray-300" />
            <p className="text-gray-600 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error in
              vero perferendis dolor! Quis vel consequuntur repellat distinctio
              rem. Corrupti ratione alias odio, error dolore temporibus
              consequatur, nobis veniam odit laborum dignissimos consectetur
              quae vero in perferendis provident quis.
            </p>
          </div>
        );

      case 'information':
        return (
          <div className="text-gray-600 text-sm">
            {/* Replace with actual Information content */}
            Product information content goes here.
          </div>
        );

      case 'review':
        return (
          <div className="text-gray-600 text-sm">
            {/* Replace with actual Review content */}
            Product reviews content goes here.
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Tabs */}
      <div className="flex border-b border-gray-300 mb-4">
        {['description', 'information', 'review'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === tab
                ? 'border-b-2 border-red-500 text-red-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>{renderContent()}</div>
    </div>
  );
};

export default ProductTabs;
