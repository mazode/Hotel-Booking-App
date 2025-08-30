import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between px-48">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">HotelBooking.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link to="/my-bookings">My Bookings</Link>
              <Link to="/my-hotels">My Hotels</Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-blue-500 px-3 font-bold hover:text-purple-500"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};
export default Header;
