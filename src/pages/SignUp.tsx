import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { signupSuccess } from "../feature/auth/authSlice";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  postCode: string;
  country: string;
  regionState: string;
};

const Signup: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    postCode: "",
    country: "",
    regionState: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fieldErrors: Record<string, string> = {};
    const required: (keyof FormData)[] = [
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "address",
      "city",
      "country",
      "regionState",
    ];

    required.forEach((k) => {
      if (!formData[k].trim()) fieldErrors[k] = "Required";
    });

    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors);
      return;
    }

    const user = {
      id: "1",
      email: formData.email,
      name: `${formData.firstName} ${formData.lastName}`.trim(),
    };

    dispatch(signupSuccess(user));
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <div className="w-full bg-[#ff4c3b] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-sm lg:px-0">
          <span>Register</span>
          <span className="text-xs opacity-90">
            Home <span className="mx-1">–</span> Register
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <Card>
          <div className="p-8 md:p-10">
            <div className="mb-8 flex items-center justify-center gap-1">
              <img
                src="/assets/Login/Group.png"
                alt="FoodTrove"
                className="h-10 w-auto"
              />
              <img src="/assets/Login/FoodTrove.png" alt="" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Input
                  label="Firast Name*"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                  placeholder="Enter Your First Name"
                />

                <Input
                  label="Last Name*"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                  placeholder="Enter Your Last Name"
                />

                <Input
                  label="Email*"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="Enter Your email"
                />

                <Input
                  label="Phone Number*"
                  type="text"
                  name="phoneNumber"
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
                  value={formData.city}
                  onChange={handleChange}
                  error={errors.city}
                  placeholder="City"
                  className="bg-slate-100"
                />

                <Input
                  label="Post Code"
                  type="text"
                  name="postCode"
                  value={formData.postCode}
                  onChange={handleChange}
                  error={errors.postCode}
                  placeholder="Post Code"
                />

                <Input
                  label="Country*"
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  error={errors.country}
                  placeholder="Country"
                  className="bg-slate-100"
                />

                <Input
                  label="Region State*"
                  type="text"
                  name="regionState"
                  value={formData.regionState}
                  onChange={handleChange}
                  error={errors.regionState}
                  placeholder="Region/State"
                  className="bg-slate-100"
                />
              </div>

              {/* Bottom row like screenshot */}
              <div className="flex items-center justify-between pt-2">
                <Button type="submit" size="lg" className="px-10">
                  Signup
                </Button>

                <div className="text-sm text-slate-500">
                  <Link
                    to="/login"
                    className="font-medium text-slate-700 hover:underline"
                  >
                    Have an account?{" "}
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
