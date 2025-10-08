import { CiSearch } from "react-icons/ci";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white px-4 sm:px-6 md:px-10 py-3 flex items-center justify-between shadow-md z-50">
      {/* Logo */}
      <div className="flex items-center flex-shrink-0">
        <img
          src="/images/wave-logo.png"
          alt="Wave logo"
          className="w-24 sm:w-28 md:w-32 lg:w-30 xl:w-28 transition-all duration-300"
        />
      </div>
      <div className="hidden md:flex items-center justify-center border-2 rounded-full px-3 sm:px-4 py-1 sm:py-2 w-[45%] sm:w-[40%] md:w-[35%] lg:w-[40%] xl:ml-109 md:ml-47 mx-auto">
        <CiSearch className="text-gray-500" size={22} />
        <input
          type="text"
          placeholder="Search"
          className="ml-2 bg-transparent outline-none w-full text-sm sm:text-base"
        />
      </div>

      {/* Right side (Badge + Name) */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
        <Link to="/profile">
          <Badge
            className="border-gray-300 bg-gray-200 h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-full font-semibold text-sm sm:text-base cursor-pointer hover:bg-blue-500 transition-colors"
            variant="secondary"
          >
            AK
          </Badge>
        </Link>
        <h2 className="font-semibold text-[15px] sm:text-[17px] md:text-[19px] tracking-tight">
          Aditya Kr
        </h2>
      </div>
    </nav>
  );
};

export default Navbar;
