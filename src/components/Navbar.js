import { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { AuthContext } from "../contexts/Auth/AuthProvider";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center bg-red-800 h-24">
      <div className="flex items-center">
        <Link to="/">
          <li
            className={`text-white mx-10 font-bold text-base list-none ${
              !isLoggedIn && "cursor-not-allowed"
            }`}
            onClick={
              isLoggedIn ? null : (e) => e.preventDefault()
            }
          >
            Dashboard
          </li>
        </Link>
      </div>

      <ul className="m-5 p-4 flex cursor-pointer">
        {isLoggedIn ? (
          // If token is present, show Logout button and logged-in user name
          <>
            <li
              onClick={handleLogout}
              className="px-3 text-white font-bold text-base"
            >
              Logout
            </li>
          </>
        ) : (
          // If no token, show SignIn and SignUp buttons
          <>
            <Link to="/">
              <li className="px-3 text-white font-bold text-base">SignIn</li>
            </Link>
            <Link to="/SignUp">
              <li className="px-3 text-white font-bold text-base">SignUp</li>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
