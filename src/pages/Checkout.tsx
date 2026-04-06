import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { clearCart } from '../feature/cart/cartSlice';
import { checkoutSchema, type CheckoutFormData } from '../schemas/checkoutSchema';
import { ROUTES } from '../utils/constant';

const initialFormData: CheckoutFormData = {
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  postCode: '',
  country: '',
  regionState: '',
  comment: '',
  paymentMethod: 'cash',
};

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector((state) => state.cart);

  const [deliveryMethod, setDeliveryMethod] = useState<'free' | 'flat'>('free');
  const [useExistingAddress, setUseExistingAddress] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (items.length === 0) {
      navigate(ROUTES.CART);
    }
  }, [items.length, navigate]);

  const deliveryCharge = deliveryMethod === 'free' ? 0 : 5;
  const subtotal = total;
  const totalAmount = subtotal + deliveryCharge;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      checkoutSchema.parse(formData);
      alert('Order placed successfully! This is a demo.');
      dispatch(clearCart());
      navigate(ROUTES.HOME);
    } catch (error: unknown) {
      const fieldErrors: Record<string, string> = {};

      if (error && typeof error === 'object' && 'errors' in error) {
        const issues = error.errors as Array<{ path: string[]; message: string }>;
        issues.forEach((issue) => {
          fieldErrors[issue.path[0]] = issue.message;
        });
      }

      setErrors(fieldErrors);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <div className="w-full bg-[#ff4c3b] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-sm lg:px-0">
          <span>Checkout</span>
          <span className="text-xs opacity-90">
            Home <span className="mx-1">-</span> Checkout
          </span>
        </div>
      </div>

      <div className="min-h-screen py-8">
        <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-8 md:px-12 lg:px-14">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="rounded-lg border bg-white p-6">
                <h2 className="mb-5 text-base font-semibold">Summary</h2>

                <div className="mb-5 space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Sub-Total</span>
                    <span className="font-medium text-gray-800">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span className="font-medium text-gray-800">
                      ${deliveryCharge.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mb-6 border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold">Total Amount</span>
                    <span className="text-base font-semibold">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="space-y-5">
                  {items.slice(0, 2).map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded border object-cover"
                      />

                      <div className="flex-1">
                        <p className="mb-1 text-sm font-medium leading-snug text-gray-800">
                          {item.name}
                        </p>

                        <div className="mb-1 flex gap-0.5">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <span key={i} className="text-sm text-orange-400">
                              ★
                            </span>
                          ))}
                          <span className="text-sm text-gray-300">★</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-emerald-500">
                            ${item.price.toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-400 line-through">
                            ${(item.price * 1.2).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-lg border bg-white p-4">
                <h3 className="mb-1 text-base font-semibold">Delivery Method</h3>
                <p className="mb-5 text-sm leading-relaxed text-gray-500">
                  Please select the preferred shipping method for this order.
                </p>

                <div className="mb-6 flex items-start gap-14">
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
                      <span className="text-sm text-gray-600">Rate - $0.00</span>
                    </div>
                  </label>

                  <label className="cursor-pointer space-y-1">
                    <p className="text-sm font-medium text-gray-800">Flat Rate</p>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === 'flat'}
                        onChange={() => setDeliveryMethod('flat')}
                        className="accent-red-500"
                      />
                      <span className="text-sm text-gray-600">Rate - $5.00</span>
                    </div>
                  </label>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-600">
                    Add Comments About Your Order
                  </label>
                  <textarea
                    rows={4}
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    className="w-full resize-none rounded-md border border-gray-200 px-4 py-2.5 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                  {errors.comment && (
                    <p className="mt-1 text-xs text-red-500">{errors.comment}</p>
                  )}
                </div>
              </div>

              <div className="mt-6 rounded-lg border bg-white p-5">
                <h3 className="mb-1 text-sm font-semibold">Payment Method</h3>
                <p className="mb-4 text-xs leading-relaxed text-gray-500">
                  Please select the preferred payment method to use on this order.
                </p>

                <div className="space-y-3">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleChange}
                      className="accent-red-500"
                    />
                    Cash On Delivery
                  </label>

                  <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleChange}
                      className="accent-red-500"
                    />
                    UPI
                  </label>

                  <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={formData.paymentMethod === 'bank'}
                      onChange={handleChange}
                      className="accent-red-500"
                    />
                    Bank Transfer
                  </label>
                </div>
              </div>

              <div className="mt-6 rounded-lg border bg-white p-4">
                <h3 className="mb-3 font-bold">Payment Method</h3>
                <img src="/assets/ui/payment.png" alt="Accepted payment methods" />
              </div>
            </div>

            <div className="lg:col-span-8">
              <form onSubmit={handlePlaceOrder}>
                <div className="max-w-3xl rounded-lg border bg-white p-6 shadow-sm">
                  <div className="mb-10">
                    <h2 className="mb-4 text-lg font-semibold leading-tight text-gray-800">
                      New
                      <br />
                      Customer
                    </h2>

                    <p className="mb-3 text-sm font-medium text-gray-700">
                      Checkout Options
                    </p>

                    <div className="mb-4 space-y-2">
                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input type="radio" name="checkout" defaultChecked className="accent-red-500" />
                        Register Account
                      </label>

                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input type="radio" name="checkout" className="accent-red-500" />
                        Guest Account
                      </label>
                    </div>

                    <p className="mb-6 max-w-xl text-xs text-gray-500">
                      By creating an account you will be able to shop faster, stay up to date on your order status, and keep track of previous orders.
                    </p>

                    <button
                      type="button"
                      className="rounded bg-red-500 px-6 py-2 text-sm font-medium text-white hover:bg-red-600"
                    >
                      Continue
                    </button>
                  </div>

                  <div>
                    <h2 className="mb-6 text-lg font-semibold text-gray-800">
                      Returning Customer
                    </h2>

                    <div className="mb-4">
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full rounded border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div className="mb-6">
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full rounded border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        className="rounded bg-red-500 px-6 py-2 text-sm font-medium text-white hover:bg-red-600"
                      >
                        Login
                      </button>
                      <button type="button" className="text-sm text-gray-600 hover:text-red-500">
                        Forgot Password?
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 max-w-3xl rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="mb-6 text-lg font-semibold">Billing Details</h3>

                  <div className="mb-6">
                    <p className="mb-3 text-sm font-medium text-gray-700">
                      Checkout Options
                    </p>

                    <div className="flex items-center gap-8 text-sm">
                      <label className="flex cursor-pointer items-center gap-2 text-gray-700">
                        <input
                          type="radio"
                          name="addressOption"
                          checked={useExistingAddress}
                          onChange={() => setUseExistingAddress(true)}
                          className="accent-red-500"
                        />
                        I want to use an existing address
                      </label>

                      <label className="flex cursor-pointer items-center gap-2 text-gray-700">
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

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm text-gray-700">
                        First Name<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        className="w-full rounded-md border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1 block text-sm text-gray-700">
                        Last Name<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        className="w-full rounded-md border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="mb-1 block text-sm text-gray-700">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Address Line 1"
                        className="w-full rounded-md border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      />
                      {errors.address && (
                        <p className="mt-1 text-xs text-red-500">{errors.address}</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1 block text-sm text-gray-700">
                        City<span className="text-red-500">*</span>
                      </label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-200 px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      >
                        <option value="">City</option>
                        <option value="Lahore">Lahore</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Islamabad">Islamabad</option>
                      </select>
                      {errors.city && (
                        <p className="mt-1 text-xs text-red-500">{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1 block text-sm text-gray-700">Post Code</label>
                      <input
                        type="text"
                        name="postCode"
                        value={formData.postCode}
                        onChange={handleChange}
                        placeholder="Post Code"
                        className="w-full rounded-md border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      />
                      {errors.postCode && (
                        <p className="mt-1 text-xs text-red-500">{errors.postCode}</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1 block text-sm text-gray-700">
                        Country<span className="text-red-500">*</span>
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-200 px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      >
                        <option value="">Country</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                      </select>
                      {errors.country && (
                        <p className="mt-1 text-xs text-red-500">{errors.country}</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1 block text-sm text-gray-700">
                        Region State
                      </label>
                      <select
                        name="regionState"
                        value={formData.regionState}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-200 px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      >
                        <option value="">Region/State</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Sindh">Sindh</option>
                        <option value="KPK">KPK</option>
                      </select>
                      {errors.regionState && (
                        <p className="mt-1 text-xs text-red-500">{errors.regionState}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="rounded bg-red-500 px-8 py-2.5 text-sm font-medium text-white transition hover:bg-red-600"
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
