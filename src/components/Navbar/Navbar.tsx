import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="relative container mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-20">
          <Link to="/">
            <h1 className="text-3xl font-bold text-lightBlue">FinShark</h1>
          </Link>
          <div className="hidden font-bold lg:flex">
            <Link to="/search" className="text-black hover:text-darkBlue transition">
              Search
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex items-center space-x-6">
          <Link to="/login" className="font-medium hover:text-darkBlue transition">
            Login
          </Link>
          <Link
            to="/register"
            className="px-8 py-3 font-bold rounded text-white bg-lightBlue hover:opacity-70 transition"
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;