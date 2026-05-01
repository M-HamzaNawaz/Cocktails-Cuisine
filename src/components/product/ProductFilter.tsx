import React from 'react';
import type {
  FilterOption,
  LabelFilterOption,
} from '../../config/productFilters';

interface Props {
  categories?: FilterOption[];
  weights?: LabelFilterOption[];
  tags?: LabelFilterOption[];
  selectedCategories?: string[];
  selectedWeights?: string[];
  selectedTags?: string[];
  priceRange?: [number, number];
  maxPrice?: number;
  toggleCategory?: (val: string) => void;
  toggleWeight?: (val: string) => void;
  toggleTag?: (val: string) => void;
  setPriceRange?: (nextRange: [number, number]) => void;
  clearFilters?: () => void;
}

// ---------- Component ----------
const ProductFilters: React.FC<Props> = ({
  categories = [],
  weights = [],
  tags = [],
  selectedCategories = [],
  selectedWeights = [],
  selectedTags = [],
  priceRange = [0, 500],
  maxPrice = 500,
  toggleCategory,
  toggleWeight,
  toggleTag,
  setPriceRange,
  clearFilters,
}) => {
  const safeMaxPrice = Math.max(1, maxPrice);
  const displayedMaxPrice = Math.min(priceRange[1], safeMaxPrice);

  return (
    <div className="space-y-8 rounded-xl bg-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between border-b pb-3">
        <h3 className="text-lg font-semibold text-gray-900">
          Product Category
        </h3>
        {clearFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs font-semibold uppercase tracking-wide text-red-500 transition hover:text-red-600"
          >
            Clear all
          </button>
        )}
      </div>
      <div className="space-y-3">
        {categories.map((category) => (
          <label
            key={category.name}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.name)}
                onChange={() => toggleCategory && toggleCategory(category.name)}
                className="w-4 h-4 accent-red-500"
              />
              <span className="text-sm text-gray-700">{category.name}</span>
            </div>
            <span className="text-xs text-gray-400">[{category.count}]</span>
          </label>
        ))}
      </div>

      {/* Price */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-3 mb-4">
          Filter By Price
        </h3>
        <input
          type="range"
          min={0}
          max={safeMaxPrice}
          value={displayedMaxPrice}
          onChange={(e) =>
            setPriceRange && setPriceRange([0, Number.parseInt(e.target.value, 10)])
          }
          className="w-full accent-red-500"
        />
        <p className="mt-3 font-semibold text-sm">
          Price:{' '}
          <span className="text-gray-600">
            ${priceRange[0]} - ${displayedMaxPrice}
          </span>
        </p>
      </div>

      {/* Weights */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-3 mb-4">
          Weight
        </h3>
        <div className="space-y-3">
          {weights.map((weight) => (
            <label
              key={weight.label}
              className="flex cursor-pointer items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedWeights.includes(weight.label)}
                  onChange={() => toggleWeight && toggleWeight(weight.label)}
                  className="w-4 h-4 accent-red-500"
                />
                <span className="text-sm text-gray-700">{weight.label}</span>
              </div>
              <span className="text-xs text-gray-400">[{weight.count}]</span>
            </label>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-3 mb-4">
          Product Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag.label}
              type="button"
              onClick={() => toggleTag && toggleTag(tag.label)}
              className={`px-3 py-1 text-sm rounded-md border transition ${
                selectedTags.includes(tag.label)
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-red-500 hover:text-white'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
