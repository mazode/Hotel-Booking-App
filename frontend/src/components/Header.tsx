import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between px-48">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">HotelBooking.com</Link>
        </span>
        <span className="flex space-x-2">
          <Link
            to="/sign-in"
            className="flex bg-white items-center text-blue-500 px-3 font-bold hover:text-purple-500 hover:text-blue-300"
          >
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
};
export default Header;
