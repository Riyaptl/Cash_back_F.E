import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slice/authSlice"; // adjust path if needed

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (!user) return null; // hide navbar if not logged in

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="py-4">
      <ul className="flex justify-center items-center space-x-8 text-amber-700 font-medium">
        <li>
          <Link
            to="/winners"
            className="hover:text-amber-800 transition-colors duration-200 text-2xl"
          >
            Winners
          </Link>
        </li>
        <li>
          <Link
            to="/serials"
            className="hover:text-amber-800 transition-colors duration-200 text-2xl"
          >
            Serials
          </Link>
        </li>
        <li>
          <Link
            to="/claim"
            className="hover:text-amber-800 transition-colors duration-200 text-2xl"
          >
            Claim Reward
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="hover:text-amber-800 transition-colors duration-200 text-2xl"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
