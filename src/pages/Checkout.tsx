import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { clearCart } from '../feature/cart/cartSlice';
import { ROUTES } from '../utils/constant';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector((state) => state.cart);

  // const [activeTab, setActiveTab] = useState<'new' | 'returning'>('new');
  const [deliveryMethod, setDeliveryMethod] = useState<'free' | 'flat'>('free');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');

  // const [newCustomerEmail, setNewCustomerEmail] = useState('');
  // const [createAccount, setCreateAccount] = useState(false);

  // const [returningEmail, setReturningEmail] = useState('');
  // const [returningPassword, setReturningPassword] = useState('');

  const [useExistingAddress, setUseExistingAddress] = useState(false);
  // const [billingDetails, setBillingDetails] = useState({
  //   firstName: '',
  //   lastName: '',
  //   address: '',
  //   city: '',
  //   postCode: '',
  //   country: 'Country',
  //   region: 'Region/State',
  // });

  const deliveryCharge = deliveryMethod === 'free' ? 0 : 10;
  const subtotal = total;
  const totalAmount = subtotal + deliveryCharge;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Order placed successfully! This is a demo.');
    dispatch(clearCart());
    navigate(ROUTES.HOME);
  };

  if (items.length === 0) {
    navigate(ROUTES.CART);
    return null;
  }

  return (
    <>
      <div className="w-full bg-[#ff4c3b] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-sm lg:px-0">
          <span>Checkout </span>
          <span className="text-xs opacity-90">
            Home <span className="mx-1">–</span> Checkout
          </span>
        </div>
      </div>
      <div className=" min-h-screen py-8">
        <div className="container max-w-7xl mx-auto py-16 px-4 sm:px-8 md:px-12 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar - Summary */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-lg p-6 border">
                {/* Title */}
                <h2 className="text-base font-semibold mb-5">Summary</h2>

                {/* Prices */}
                <div className="space-y-3 text-sm text-gray-600 mb-5">
                  <div className="flex justify-between">
                    <span>Sub-Total</span>
                    <span className="text-gray-800 font-medium">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span className="text-gray-800 font-medium">
                      ${deliveryCharge.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-semibold">
                      Total Amount
                    </span>
                    <span className="text-base font-semibold">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Products */}
                <div className="space-y-5">
                  {items.slice(0, 2).map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded object-cover border"
                      />

                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800 leading-snug mb-1">
                          {item.name}
                        </p>

                        {/* Rating */}
                        <div className="flex gap-0.5 mb-1">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <span key={i} className="text-orange-400 text-sm">
                              ★
                            </span>
                          ))}
                          <span className="text-gray-300 text-sm">★</span>
                        </div>

                        {/* Prices */}
                        <div className="flex items-center gap-3">
                          <span className="text-emerald-500 text-sm font-semibold">
                            ${item.price.toFixed(2)}
                          </span>
                          <span className="text-gray-400 text-sm line-through">
                            ${(item.price * 1.2).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Method */}
              <div className="bg-white rounded-lg p-3 border mt-6">
                {/* Title */}
                <h3 className="font-semibold text-base mb-1">
                  Delivery Method
                </h3>

                <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                  Please select the preferred shipping method to use on this
                  order.
                </p>

                {/* Shipping options */}
                <div className="flex items-start gap-14 mb-6">
                  {/* Free Shipping */}
                  <label className="cursor-pointer space-y-1">
                    <p className="text-sm font-medium text-gray-800">
                      Free Shipping
                    </p>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === 'free'}
                        onChange={() => setDeliveryMethod('free')}
                        className="accent-red-500"
                      />
                      <span className="text-sm text-gray-600">
                        Rate – $0.00
                      </span>
                    </div>
                  </label>

                  {/* Flat Rate */}
                  <label className="cursor-pointer space-y-1">
                    <p className="text-sm font-medium text-gray-800">
                      Flat Rate
                    </p>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === 'flat'}
                        onChange={() => setDeliveryMethod('flat')}
                        className="accent-red-500"
                      />
                      <span className="text-sm text-gray-600">
                        Rate – $5.00
                      </span>
                    </div>
                  </label>
                </div>

                {/* Comment box */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Add Comments About Your Order
                  </label>
                  <textarea
                    rows={4}
                    className="w-full rounded-md border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 resize-none"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg p-5 border mt-6">
                {/* Title */}
                <h3 className="font-semibold text-sm mb-1">Payment Method</h3>

                <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                  Please select the preferred payment method to use on this
                  order.
                </p>

                {/* Payment options */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cash'}
                      onChange={() => setPaymentMethod('cash')}
                      className="accent-red-500"
                    />
                    Cash On Delivery
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-red-500"
                    />
                    UPI
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-red-500"
                    />
                    Bank Transfer
                  </label>
                </div>
              </div>

              {/* Payment Method Icons */}
              <div className="bg-white rounded-lg p-4 border mt-6">
                <h3 className="font-bold mb-3">Payment Method</h3>
                <img src="/assets/ui/payment.png" alt="" />
              </div>
            </div>

            {/* Right Content Area */}
            <div className="lg:col-span-8 ">
              <form onSubmit={handlePlaceOrder}>
                {/* Customer Type Tabs */}
                <div className="bg-white border rounded-lg p-6 shadow-sm max-w-3xl">
                  {/* NEW CUSTOMER */}
                  <div className="mb-10">
                    <h2 className="text-lg font-semibold text-gray-800 leading-tight mb-4">
                      New <br /> Customer
                    </h2>

                    <p className="text-sm font-medium text-gray-700 mb-3">
                      Checkout Options
                    </p>

                    <div className="space-y-2 mb-4">
                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="radio"
                          name="checkout"
                          defaultChecked
                          className="accent-red-500"
                        />
                        Register Account
                      </label>

                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="radio"
                          name="checkout"
                          className="accent-red-500"
                        />
                        Guest Account
                      </label>
                    </div>

                    <p className="text-xs text-gray-500 max-w-xl mb-6">
                      By creating an account you will be able to shop faster, be
                      up to date on an order's status, and keep track of the
                      orders you have previously made.
                    </p>

                    <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded text-sm font-medium">
                      Continue
                    </button>
                  </div>

                  {/* RETURNING CUSTOMER */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-6">
                      Returning Customer
                    </h2>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded text-sm font-medium">
                        Login
                      </button>
                      <button className="text-sm text-gray-600 hover:text-red-500">
                        Forgot Password?
                      </button>
                    </div>
                  </div>
                </div>

                {/* Billing Details */}
                <div className="bg-white rounded-lg p-6 shadow-sm border max-w-3xl border-gray-100 mt-6">
                  <h3 className="font-semibold text-lg mb-6">
                    Billing Details
                  </h3>

                  {/* Checkout Options */}
                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-700 mb-3">
                      Checkout Options
                    </p>

                    <div className="flex items-center gap-8 text-sm">
                      <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                        <input
                          type="radio"
                          name="addressOption"
                          checked={useExistingAddress}
                          onChange={() => setUseExistingAddress(true)}
                          className="accent-red-500"
                        />
                        I want to use an existing address
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                        <input
                          type="radio"
                          name="addressOption"
                          checked={!useExistingAddress}
                          onChange={() => setUseExistingAddress(false)}
                          className="accent-red-500"
                        />
                        I want to use new address
                      </label>
                    </div>
                  </div>

                  {/* FORM */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* First Name */}
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        First Name<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your first name"
                        className="w-full rounded-md border border-gray-200 px-4 py-2.5 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                      />
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        Last Name<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your last name"
                        className="w-full rounded-md border border-gray-200 px-4 py-2.5 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                      />
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                      <label className="block text-sm text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        placeholder="Address Line 1"
                        className="w-full rounded-md border border-gray-200 px-4 py-2.5 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                      />
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        City<span className="text-red-500">*</span>
                      </label>
                      <select className="w-full rounded-md border border-gray-200 px-4 py-2.5 text-sm text-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none">
                        <option>City</option>
                        <option>Lahore</option>
                        <option>Karachi</option>
                        <option>Islamabad</option>
                      </select>
                    </div>

                    {/* Post Code */}
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        Post Code
                      </label>
                      <input
                        type="text"
                        placeholder="Post Code"
                        className="w-full rounded-md border border-gray-200 px-4 py-2.5 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                      />
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        Country<span className="text-red-500">*</span>
                      </label>
                      <select className="w-full rounded-md border border-gray-200 px-4 py-2.5 text-sm text-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none">
                        <option>Country</option>
                        <option>Pakistan</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                      </select>
                    </div>

                    {/* Region */}
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        Region State
                      </label>
                      <select className="w-full rounded-md border border-gray-200 px-4 py-2.5 text-sm text-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none">
                        <option>Region/State</option>
                        <option>Punjab</option>
                        <option>Sindh</option>
                        <option>KPK</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="bg-red-500 hover:bg-red-600 text-white px-8 py-2.5 rounded text-sm font-medium transition"
                  >
                    Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
