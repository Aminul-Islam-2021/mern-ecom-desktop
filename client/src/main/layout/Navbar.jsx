import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../store/features/auth/authApi";
import { logoutInfo } from "../../store/features/auth/authSlice";
import toast from "react-hot-toast";

// Reusable Component for Cart, Login, and Register
const AuthLinks = ({ totalCart, handleLogout, userInfo }) => {
  return (
    <div className="flex items-center gap-3 lg:gap-6">
      <div className="relative">
        <Link to="/cart">
          Cart
          {totalCart > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full h-4 w-4 flex items-center justify-center">
              {totalCart}
            </span>
          )}
        </Link>
      </div>

      {userInfo ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </div>
  );
};

const Navbar = () => {
  const totalCart = useSelector((state) => state.cart.cartItems.length);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [logout, { isloading }] = useLogoutMutation();
  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutInfo());
      toast.success("Logout successful!");
    } catch (error) {
      toast.error("Failed to logout: ", error);
    }
  };
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
            <AuthLinks
              totalCart={totalCart}
              handleLogout={handleLogout}
              userInfo={userInfo}
            />
          </div>
        </div>

        {/* Search bar: Second row on small screens, inline in large screens */}
        <SearchBar />

        {/* AuthLinks (Cart, Login, Register) - Hidden on small screens, shown after search bar in large screens */}
        <div className="hidden lg:flex">
          <AuthLinks
            totalCart={totalCart}
            handleLogout={handleLogout}
            userInfo={userInfo}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
