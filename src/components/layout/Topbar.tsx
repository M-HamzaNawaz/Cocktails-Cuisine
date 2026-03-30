import { FC } from "react";
import { CiPhone } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

const Topbar: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="border-b border-slate-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between py-2">
        <div className="border p-1 rounded">
          <img src="/assets/ui/Icon.png" alt="Icon" />
        </div>

        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-red-500">
            Home
          </Link>

          {/* Category */}
          <select className="outline-none cursor-pointer">
            <option>Category</option>
          </select>

          {/* Products */}
          <select
            className="outline-none cursor-pointer"
            onChange={(e) => navigate(e.target.value)}
            defaultValue=""
          >
            <option value="">
              Products
            </option>
            <option value="/products">All Products</option>
          </select>

          {/* Pages */}
          <select
            className="outline-none cursor-pointer"
            onChange={(e) => navigate(e.target.value)}
            defaultValue=""
          >
            <option value="">
              Pages
            </option>
            <option value="/login">Login</option>
            <option value="/signup">Register</option>
          </select>

          {/* Blog */}
          <Link to="/blog" className="hover:text-red-500">
            Blog
          </Link>

          {/* Elements */}
          <Link to="/about" className="hover:text-red-500">
            Elements
          </Link>
        </div>

        <div>
          <span className="flex items-center gap-1">
            <CiPhone size={16} />
            +123 (456) 7890
          </span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;


