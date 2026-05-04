import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ZodError } from 'zod';
import { useAppDispatch } from '../app/hooks';
import { loginSuccess } from '../feature/auth/authSlice';
import { loginSchema } from '../feature/auth/authSchema';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import PageBanner from '../components/ui/PageBanner';
import { useToast } from '../components/ui/ToastProvider';
import { ROUTES } from '../utils/constant';
import { SUCCESS_MESSAGES } from '../utils/constant';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const redirectTo =
    typeof location.state?.from === 'string' ? location.state.from : ROUTES.HOME;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      loginSchema.parse(formData);

      const user = {
        id: '1',
        email: formData.email,
        name: formData.email.split('@')[0],
      };

      dispatch(loginSuccess(user));
      showToast(SUCCESS_MESSAGES.LOGIN_SUCCESS);
      navigate(redirectTo, { replace: true });
    } catch (error) {
      const fieldErrors: Record<string, string> = {};

      if (error instanceof ZodError) {
        error.issues.forEach((issue) => {
          fieldErrors[String(issue.path[0])] = issue.message;
        });
      }

      setErrors(fieldErrors);
    }
  };

  return (
    <div className="flex min-h-screen flex-col gap-14 bg-[#fafafa] text-slate-800">
      <PageBanner title="Login" />

      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-md">
          <Card>
            <div className="p-8">
              <div className="flex flex-row-reverse items-center justify-center">
                <img src="/assets/Login/FoodTrove.png" alt="Foodzy wordmark" />
                <img src="/assets/Login/Group.png" alt="Foodzy logo mark" />
              </div>

              <form onSubmit={handleSubmit}>
                <Input
                  label="Email Address*"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="Enter your email"
                />

                <Input
                  label="Password*"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  placeholder="Enter your password"
                />

                <div className="flex items-center justify-between gap-4 pb-7">
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-[#ff4c3b] focus:ring-[#ff4c3b]"
                    />
                    Remember me
                  </label>

                  <Link
                    to={ROUTES.FORGOT_PASSWORD}
                    className="text-sm font-medium text-gray-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="flex items-center gap-56">
                  <Button type="submit" size="lg">
                    Login
                  </Button>
                  <p className="mt-6 text-center text-gray-600">
                    <Link to={ROUTES.SIGNUP} className="text-gray-600 hover:underline">
                      Signup?
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
