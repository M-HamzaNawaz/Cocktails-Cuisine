import type {
  FilterOption,
  LabelFilterOption,
} from '../config/productFilters';
import type { Product } from '../types/product';

interface ProductFilterOptions {
  categories: FilterOption[];
  weights: LabelFilterOption[];
  tags: LabelFilterOption[];
  maxPrice: number;
}

export const buildProductFilterOptions = (
  products: Product[],
): ProductFilterOptions => {
  const categories = Array.from(
    products.reduce((map, product) => {
      map.set(product.category, (map.get(product.category) ?? 0) + 1);
      return map;
    }, new Map<string, number>()),
    ([name, count]) => ({ name, count }),
  );

  const weights = Array.from(
    products.reduce((map, product) => {
      if (!product.weight) {
        return map;
      }

      map.set(product.weight, (map.get(product.weight) ?? 0) + 1);
      return map;
    }, new Map<string, number>()),
    ([label, count]) => ({ label, count }),
  );

  const tags = Array.from(
    products.reduce((map, product) => {
      product.tags?.forEach((tag) => {
        map.set(tag, (map.get(tag) ?? 0) + 1);
      });

      return map;
    }, new Map<string, number>()),
    ([label, count]) => ({ label, count }),
  );

  const maxPrice = Math.max(
    1,
    Math.ceil(
      products.reduce(
        (highest, product) => Math.max(highest, product.price),
        0,
      ),
    ),
  );

  return {
    categories,
    weights,
    tags,
    maxPrice,
  };
};
