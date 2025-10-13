import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faFolder,
  faChair,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Category, Dishes, Menu, Tables } from "../utils";
import useGetAllAmout from "../hooks/useGetAllAmout";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("Dishes");
  const { dishes, menus, categories, tables } = useGetAllAmout();

  const cards = [
    {
      title: "Dishes",
      value: dishes,
      icon: faUtensils,
      color: "from-green-400 to-emerald-600",
    },
    {
      title: "Category",
      value: categories,
      icon: faFolder,
      color: "from-blue-400 to-cyan-600",
    },
    {
      title: "Tables",
      value: tables,
      icon: faChair,
      color: "from-pink-400 to-rose-600",
    },
    {
      title: "Menu",
      value: menus,
      icon: faBookOpen,
      color: "from-yellow-400 to-orange-600",
    },
  ];

  // RENDER TABLES
  const renderTable = () => {
    switch (activeSection) {
      case "Dishes":
        return <Dishes />;
      case "Category":
        return <Category />;
      case "Tables":
        return <Tables />;
      case "Menu":
        return <Menu />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => setActiveSection(card.title)}
            className={`relative overflow-hidden p-5 rounded-2xl bg-gradient-to-br ${
              card.color
            } shadow-lg hover:shadow-2xl transform hover:scale-[1.03] transition-all duration-300 cursor-pointer ${
              activeSection === card.title ? "ring-2 ring-white/70" : ""
            }`}
          >
            <div className="absolute top-4 right-4 text-white/30 text-5xl">
              <FontAwesomeIcon icon={card.icon} />
            </div>
            <div className="relative z-10">
              <h2 className="text-white/90 font-semibold text-lg">
                {card.title}
              </h2>
              <h1 className="text-4xl font-bold text-white mt-1">
                {card.value}
              </h1>
              <p className="text-white/60 text-sm mt-1">Click to view</p>
            </div>
          </div>
        ))}
      </div>

      {/* TABLE SECTION */}
      <div className="bg-gray-800 rounded-2xl shadow-lg p-6 overflow-x-auto">
        {renderTable()}
      </div>
    </div>
  );
}

export default Dashboard;
