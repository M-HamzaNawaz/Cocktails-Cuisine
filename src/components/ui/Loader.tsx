import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="text-center py-12">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
    </div>
  );
};

export default Loader;
