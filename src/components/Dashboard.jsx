import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faFolder,
  faChair,
  faBookOpen,
  faTrash,
  faReply,
  faEdit,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("Dishes");
  const [showModal, setShowModal] = useState(false);

  const cards = [
    {
      title: "Dishes",
      value: 19,
      icon: faUtensils,
      color: "from-green-400 to-emerald-600",
    },
    {
      title: "Category",
      value: 8,
      icon: faFolder,
      color: "from-blue-400 to-cyan-600",
    },
    {
      title: "Tables",
      value: 12,
      icon: faChair,
      color: "from-pink-400 to-rose-600",
    },
    {
      title: "Menu",
      value: 5,
      icon: faBookOpen,
      color: "from-yellow-400 to-orange-600",
    },
  ];

  // RENDER TABLES
  const renderTable = () => {
    switch (activeSection) {
      case "Dishes":
        return (
          <table className="table-auto w-full text-left border-collapse text-white">
            <caption className="caption-top text-lg font-semibold mb-2 text-white">
              🍔 Dishes
            </caption>
            <thead>
              <tr className="bg-gray-700 text-gray-300">
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-700 transition-all duration-200">
                <td className="px-4 py-2">
                  <img
                    className="w-[60px] h-[60px] rounded-2xl object-cover"
                    src="https://thedeliciousspoon.com/wp-content/uploads/2019/04/Burger-pic-pin-1.jpg"
                    alt="dish"
                  />
                </td>
                <td className="px-4 py-2 font-medium">Burger</td>
                <td className="px-4 py-2">$15</td>
                <td className="px-4 py-2">Main Dish</td>
                <td className="px-4 py-2 flex gap-3 justify-center">
                  <button className="text-red-400 hover:text-red-500">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button className="text-blue-400 hover:text-blue-500">
                    <FontAwesomeIcon icon={faReply} />
                  </button>
                  <button className="text-green-400 hover:text-green-500">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        );
      case "Category":
        return (
          <table className="table-auto w-full text-left text-white">
            <caption className="caption-top text-lg font-semibold mb-2 text-white">
              🗂️ Categories
            </caption>
            <thead>
              <tr className="bg-gray-700 text-gray-300">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-700">
                <td className="px-4 py-2">Main Dish</td>
                <td className="px-4 py-2">Delicious cooked meals</td>
              </tr>
            </tbody>
          </table>
        );
      case "Tables":
        return (
          <table className="table-auto w-full text-left text-white">
            <caption className="caption-top text-lg font-semibold mb-2 text-white">
              🪑 Tables
            </caption>
            <thead>
              <tr className="bg-gray-700 text-gray-300">
                <th className="px-4 py-2">Table Number</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-700">
                <td className="px-4 py-2">Table 1</td>
                <td className="px-4 py-2 text-green-400">Available</td>
              </tr>
            </tbody>
          </table>
        );
      case "Menu":
        return (
          <table className="table-auto w-full text-left text-white">
            <caption className="caption-top text-lg font-semibold mb-2 text-white">
              📖 Menu
            </caption>
            <thead>
              <tr className="bg-gray-700 text-gray-300">
                <th className="px-4 py-2">Menu Item</th>
                <th className="px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-700">
                <td className="px-4 py-2">Pasta Combo</td>
                <td className="px-4 py-2">$20</td>
              </tr>
            </tbody>
          </table>
        );
      default:
        return null;
    }
  };

  // RENDER MODAL FORM
  const renderForm = () => {
    switch (activeSection) {
      case "Dishes":
        return (
          <>
            <label className="block mb-2 text-sm">Dish Name</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-700 text-white mb-3"
              placeholder="Enter dish name"
            />
            <label className="block mb-2 text-sm">Price</label>
            <input
              type="number"
              className="w-full p-2 rounded bg-gray-700 text-white mb-3"
              placeholder="Enter price"
            />
            <label className="block mb-2 text-sm">Image URL</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-700 text-white mb-3"
              placeholder="Enter image URL"
            />
          </>
        );
      case "Category":
        return (
          <>
            <label className="block mb-2 text-sm">Category Name</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-700 text-white mb-3"
              placeholder="Enter category name"
            />
            <label className="block mb-2 text-sm">Description</label>
            <textarea
              className="w-full p-2 rounded bg-gray-700 text-white mb-3"
              placeholder="Enter description"
            ></textarea>
          </>
        );
      case "Menu":
        return (
          <>
            <label className="block mb-2 text-sm">Menu Item</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-700 text-white mb-3"
              placeholder="Enter menu item name"
            />
            <label className="block mb-2 text-sm">Price</label>
            <input
              type="number"
              className="w-full p-2 rounded bg-gray-700 text-white mb-3"
              placeholder="Enter price"
            />
          </>
        );
      default:
        return <p>No form available.</p>;
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

      {/* HEADER + ADD BUTTON */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-semibold">{activeSection}</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
        >
          <FontAwesomeIcon icon={faPlus} />
          Add {activeSection}
        </button>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-gray-800 rounded-2xl shadow-lg p-6 overflow-x-auto">
        {renderTable()}
      </div>

      {/* MODAL FORM */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded-2xl w-[90%] sm:w-[400px] relative shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <h3 className="text-xl font-semibold mb-4">
              Add New {activeSection}
            </h3>
            {renderForm()}
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg mt-3">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
