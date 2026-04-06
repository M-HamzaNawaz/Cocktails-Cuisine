import { mockProducts } from '../data/mockProducts';
import type { Product } from '../types/product';

const delay = (ms: number) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

export const getProducts = async (): Promise<Product[]> => {
  await delay(400);
  return mockProducts;
};

export const getProductById = async (id: string): Promise<Product> => {
  await delay(250);

  const product = mockProducts.find((item) => item.id === id);

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};
