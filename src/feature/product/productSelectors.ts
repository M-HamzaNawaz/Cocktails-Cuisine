import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

const selectProductsState = (state: RootState) => state.products;
const normalize = (value: string) => value.trim().toLowerCase();

export const selectFilteredProducts = createSelector(
  [selectProductsState],
  ({ products, filters }) => {
    const normalizedQuery = normalize(filters.searchQuery);
    const selectedCategories = filters.selectedCategories.map(normalize);
    const selectedWeights = filters.selectedWeights.map(normalize);
    const selectedTags = filters.selectedTags.map(normalize);

    const filtered = products.filter((product) => {
      const normalizedCategory = normalize(product.category);
      const normalizedWeight = product.weight ? normalize(product.weight) : null;
      const normalizedTags = product.tags?.map(normalize) ?? [];
      const matchesPrice =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];
      const matchesCategories =
        selectedCategories.length === 0 ||
        selectedCategories.includes(normalizedCategory);
      const matchesWeights =
        selectedWeights.length === 0 ||
        (normalizedWeight ? selectedWeights.includes(normalizedWeight) : false);
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => normalizedTags.includes(tag));
      const matchesQuery =
        normalizedQuery.length === 0 ||
        normalize(product.name).includes(normalizedQuery) ||
        normalize(product.description).includes(normalizedQuery);

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
