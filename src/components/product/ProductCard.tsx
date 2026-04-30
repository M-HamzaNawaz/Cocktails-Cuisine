import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineShoppingBag } from 'react-icons/md';
import type { Product } from '../../types/product';

interface Props {
  product: Product;
  addToCart: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product, addToCart }) => {
  return (
    <div className="overflow-hidden rounded-md border border-slate-200 bg-white p-2">
      <div className="relative border rounded-md bg-gray-100 p-6 h-56 flex justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full object-contain"
        />
        <div
          onClick={() => addToCart(product)}
          className="cursor-pointer bg-gray-100 absolute p-1 -bottom-3 border rounded-full"
        >
          <MdOutlineShoppingBag className="text-base text-[#64B496]" />
        </div>
      </div>

      <div className="p-4 flex flex-col items-center">
        <p className="text-xs text-gray-500 mb-1">{product.category}</p>

        <Link to={`/products/${product.id}`}>
          <h3 className="font-medium text-[15px] leading-[24px] tracking-[0.48px] text-center text-gray-900 mb-2 line-clamp-2 min-h-[48px] hover:text-red-500 transition">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-baseline gap-2">
          <span className="text-red-500 text-lg font-bold">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-gray-400 text-sm line-through">
            ${(product.price * 1.2).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
