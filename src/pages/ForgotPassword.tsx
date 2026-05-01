import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import PageBanner from '../components/ui/PageBanner';
import { ROUTES } from '../utils/constant';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Email is required');
      setIsSubmitted(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsSubmitted(false);
      return;
    }

    setError('');
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-800">
      <PageBanner title="Forgot Password" />

      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="mx-auto max-w-md">
          <Card className="overflow-hidden rounded-[28px] border border-slate-200 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
            <div className="border-b border-slate-100 bg-gradient-to-r from-[#fff8f5] via-white to-[#fff8f5] px-8 py-7 text-center">
              <div className="flex flex-row-reverse items-center justify-center gap-1">
                <img src="/assets/Login/FoodTrove.png" alt="Foodzy wordmark" />
                <img src="/assets/Login/Group.png" alt="Foodzy logo mark" />
              </div>
              <h1 className="mt-5 text-2xl font-bold text-slate-900">
                Reset your password
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter your account email and we will send you a password reset
                link.
              </p>
            </div>

            <div className="p-8">
              {isSubmitted ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-6 text-center">
                  <h2 className="text-lg font-semibold text-emerald-800">
                    Reset link sent
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-emerald-700">
                    If an account exists for <span className="font-semibold">{email}</span>,
                    you will receive reset instructions shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Input
                    label="Email Address*"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    error={error}
                    placeholder="Enter your email"
                    className="rounded-xl border-slate-200 px-4 py-3"
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="mt-4 w-full rounded-xl bg-[#ff4c3b] text-white hover:bg-[#e63f2f]"
                  >
                    Send Reset Link
                  </Button>
                </form>
              )}

              <div className="mt-6 flex items-center justify-between gap-3 text-sm text-slate-500">
                <Link to={ROUTES.LOGIN} className="font-medium text-slate-700 hover:underline">
                  Back to Login
                </Link>
                <Link to={ROUTES.SIGNUP} className="font-medium text-slate-700 hover:underline">
                  Create account
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
