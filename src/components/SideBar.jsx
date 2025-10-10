import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUtensils,
  faShoppingCart,
  faPersonCircleCheck,
  faUser,
  faProjectDiagram,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useSearch } from "../context/SearchContext";

const filters = [
  { title: "Home", link: "/", icon: faHome },
  { title: "Dashboard", link: "/dashboard", icon: faHome },
  { title: "Tabels", link: "/tables", icon: faUtensils },

  { title: "Orders", link: "/orders", icon: faShoppingCart },
  { title: "Profile", link: "/profile", icon: faPersonCircleCheck },
];

const Adminfilters = [{ title: "users", link: "/users", icon: faUser }];

function SideBar() {
  const [filter, setFilter] = useState("Home");
  const { isOpen, setIsOpen } = useSearch();

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } md:flex  w-[250px] min-w-[220px] resize-x overflow-auto h-[calc(100vh-60px)] bg-[#232427] text-gray-200 shadow-lg flex-col`}
    >
      {/* Menu */}
      <ul className="flex flex-col mt-4 space-y-2 px-2">
        {filters.map((item) => (
          <li
            key={item.title}
            onClick={() => {
              setFilter(item.title);
              setIsOpen(!isOpen);
            }}
          >
            <Link
              to={item.link}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-yellow-300 hover:text-black transition-colors duration-200 ${
                item.title === filter ? "bg-yellow-500" : ""
              }`}
            >
              <FontAwesomeIcon icon={item.icon} className="text-lg" />
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="flex flex-col mt-4 space-y-2 px-2 pt-2 border-t border-gray-700">
        {Adminfilters.map((item) => (
          <li
            key={item.title}
            onClick={() => {
              setFilter(item.title);
              setIsOpen(!isOpen);
            }}
          >
            <Link
              to={item.link}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-yellow-300 hover:text-black transition-colors duration-200 ${
                item.title === filter ? "bg-yellow-500" : ""
              }`}
            >
              <FontAwesomeIcon icon={item.icon} className="text-lg" />
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Footer / Settings */}
      <div className="mt-auto px-6 py-4 border-t border-gray-700 text-sm text-gray-400">
        © 2025 MyRestaurant
      </div>
    </div>
  );
}

export default SideBar;
