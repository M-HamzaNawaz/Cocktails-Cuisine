import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

const selectProductsState = (state: RootState) => state.products;

export const selectFilteredProducts = createSelector(
  [selectProductsState],
  ({ products, filters }) => {
    const normalizedQuery = filters.searchQuery.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const matchesPrice =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];
      const matchesCategories =
        filters.selectedCategories.length === 0 ||
        filters.selectedCategories.includes(product.category);
      const matchesWeights =
        filters.selectedWeights.length === 0 ||
        (product.weight ? filters.selectedWeights.includes(product.weight) : false);
      const matchesTags =
        filters.selectedTags.length === 0 ||
        filters.selectedTags.some((tag) => product.tags?.includes(tag));
      const matchesQuery =
        normalizedQuery.length === 0 ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery);

      return (
        matchesPrice &&
        matchesCategories &&
        matchesWeights &&
        matchesTags &&
        matchesQuery
      );
    });

    return filtered.sort((a, b) => {
      if (filters.sortBy === 'price-low') {
        return a.price - b.price;
      }

      if (filters.sortBy === 'price-high') {
        return b.price - a.price;
      }

      if (filters.sortBy === 'newest') {
        return (
          new Date(b.createdAt ?? 0).getTime() -
          new Date(a.createdAt ?? 0).getTime()
        );
      }

      return 0;
    });
  },
);
