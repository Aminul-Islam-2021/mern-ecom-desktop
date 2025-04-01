import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

// Reusable Component for Cart, Login, and Register
const AuthLinks = () => {
  return (
    <div className="flex items-center gap-3 lg:gap-6">
      <Link to="/cart">Cart</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
};

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white px-3 py-3 lg:px-8">
      {/* First row (Logo, Navigation, Cart, Login, Register) */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Top row content (always on top in small screens) */}
        <div className="flex items-center justify-between w-full gap-3">
          <span>Logo</span>
          <div className="flex gap-2 lg:mr-32 lg:gap-6">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/products">Products</Link>
          </div>
          {/* Show AuthLinks in small screens (top row) */}
          <div className="lg:hidden">
            <AuthLinks />
          </div>
        </div>

        {/* Search bar: Second row on small screens, inline in large screens */}
        <SearchBar />

        {/* AuthLinks (Cart, Login, Register) - Hidden on small screens, shown after search bar in large screens */}
        <div className="hidden lg:flex">
          <AuthLinks />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
