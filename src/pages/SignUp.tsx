import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import PageBanner from '../components/ui/PageBanner';
import { useToast } from '../components/ui/ToastProvider';
import { signupSuccess } from '../feature/auth/authSlice';
import {
  signupSchema,
  type SignupFormData,
} from '../feature/auth/authSchema';
import { SUCCESS_MESSAGES } from '../utils/constant';

const initialFormData: SignupFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  address: '',
  city: '',
  postCode: '',
  country: '',
  regionState: '',
};

const Signup: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [formData, setFormData] = useState<SignupFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const parsed = signupSchema.parse(formData);
      const user = {
        id: '1',
        email: parsed.email,
        name: `${parsed.firstName} ${parsed.lastName}`.trim(),
      };

      dispatch(signupSuccess(user));
      showToast(SUCCESS_MESSAGES.SIGNUP_SUCCESS);
      navigate('/');
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

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <PageBanner title="Register" />

      <div className="mx-auto max-w-4xl px-4 py-12">
        <Card>
          <div className="p-8 md:p-10">
            <div className="mb-8 flex items-center justify-center gap-1">
              <img
                src="/assets/Login/Group.png"
                alt="Foodzy"
                className="h-10 w-auto"
              />
              <img src="/assets/Login/FoodTrove.png" alt="Foodzy wordmark" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Input
                  label="First Name*"
                  type="text"
                  name="firstName"
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                  placeholder="Enter your first name"
                />

                <Input
                  label="Last Name*"
                  type="text"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                  placeholder="Enter your last name"
                />

                <Input
                  label="Email*"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="Enter your email"
                />

                <Input
                  label="Phone Number*"
                  type="text"
                  name="phoneNumber"
                  autoComplete="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  error={errors.phoneNumber}
                  placeholder="Enter your phone number"
                />

                <div className="md:col-span-2">
                  <Input
                    label="Address*"
                    type="text"
                    name="address"
                    autoComplete="street-address"
                    value={formData.address}
                    onChange={handleChange}
                    error={errors.address}
                    placeholder="Address"
                  />
                </div>

                <Input
                  label="City*"
                  type="text"
                  name="city"
                  autoComplete="address-level2"
                  value={formData.city}
                  onChange={handleChange}
                  error={errors.city}
                  placeholder="City"
                />

                <Input
                  label="Post Code"
                  type="text"
                  name="postCode"
                  autoComplete="postal-code"
                  value={formData.postCode}
                  onChange={handleChange}
                  error={errors.postCode}
                  placeholder="Post Code"
                />

                <Input
                  label="Country*"
                  type="text"
                  name="country"
                  autoComplete="country-name"
                  value={formData.country}
                  onChange={handleChange}
                  error={errors.country}
                  placeholder="Country"
                />

                <Input
                  label="Region State*"
                  type="text"
                  name="regionState"
                  autoComplete="address-level1"
                  value={formData.regionState}
                  onChange={handleChange}
                  error={errors.regionState}
                  placeholder="Region/State"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button type="submit" size="lg" className="px-10">
                  Signup
                </Button>

                <div className="text-sm text-slate-500">
                  <Link
                    to="/login"
                    className="font-medium text-slate-700 hover:underline"
                  >
                    Have an account?
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
