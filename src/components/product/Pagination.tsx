import React from 'react';

interface Props {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  return (
    <div className="text-base flex justify-center items-center mt-8">
      <button
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        className="px-3 py-1.5 border border-gray-300"
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-3 py-1.5 border border-gray-300 ${
            currentPage === i + 1 ? 'bg-red-500 text-white' : ''
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        className="px-3 py-1.5 border border-gray-300"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
