import { faBell, faMessage, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useSearch } from "../context/SearchContext";

function Navbar() {
  const { search, searchHandler, setSearch } = useSearch();

  return (
    <div className="h-[64px] bg-[#232427] text-white flex items-center justify-between px-6 shadow-md">
      {/* Left: Branding */}
      <h1 className="w-[240px] font-extrabold text-xl tracking-wide flex items-center gap-2 cursor-pointer">
        🍴{" "}
        <span>
          {" "}
          <Link to={"/"}>MyRestaurant</Link>{" "}
        </span>
      </h1>
      {/* Middle: Search */}

      <div className="flex flex-1 max-w-lg mx-6">
        <div className="relative w-full">
          {/* Search icon */}
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          {/* Input */}
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchHandler()}
            value={search}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-[#2e2f34] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
            placeholder="Search for dishes, tables..."
          />
        </div>
      </div>
      {/* Right: Icons + Profile */}
      <div className="flex items-center gap-5">
        {/* Theme toggle */}

        {/* Notification */}
        <Link to={"/notification"}>
          <button className="relative hover:text-yellow-400 transition-colors cursor-pointer">
            <FontAwesomeIcon icon={faBell} className="text-xl" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-[10px] font-bold text-white rounded-full w-5 h-5 flex items-center justify-center shadow">
              3
            </span>
          </button>
        </Link>

        {/* Messages */}
        <button className="relative hover:text-yellow-400 transition-colors cursor-pointer">
          <FontAwesomeIcon icon={faMessage} className="text-lg" />
          <span className="absolute -top-2 -right-2 bg-green-500 text-[10px] font-bold text-white rounded-full w-5 h-5 flex items-center justify-center shadow">
            5
          </span>
        </button>

        {/* Profile dropdown */}

        <SignedOut>
          <button className="btn btn-primary cursor-pointer">
            <SignInButton className="cursor-pointer" />
          </button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default Navbar;
