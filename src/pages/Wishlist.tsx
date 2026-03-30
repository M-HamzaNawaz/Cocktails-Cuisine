import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { removeFromWishlist } from '../feature/wishlist/wishlistSlice';
import { addToCart } from '../feature/cart/cartSlice';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Wishlist: React.FC = () => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const handleRemove = (id: string) => {
    dispatch(removeFromWishlist(id));
  };

  const handleAddToCart = (product: (typeof wishlistItems)[0]) => {
    dispatch(addToCart(product));
    dispatch(removeFromWishlist(product.id));
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h2>
        <p className="text-gray-600 mb-8">
          Save your favorite items for later!
        </p>
        <Link to="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Wishlist</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <Card key={item.id}>
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="text-sm text-gray-500 mb-1">{item.category}</div>
              <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
              <p className="text-gray-600 text-sm mb-3">
                {item.description.substring(0, 60)}...
              </p>
              <div className="flex items-center mb-3">
                <span className="text-yellow-500">⭐</span>
                <span className="ml-1 text-sm">{item.rating}</span>
              </div>
              <div className="mb-4">
                <span className="text-2xl font-bold text-blue-600">
                  ${item.price}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
