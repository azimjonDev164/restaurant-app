import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faReply,
  faEdit,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Category() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({
    name: "",
    menu: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // Example request body
      const body = { name: data.name, menu: data.menu };

      console.log("Category data to send:", body);

      // Example POST request (uncomment when backend is ready)
      /*
      const response = await fetch("http://localhost:5000/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      console.log("Server response:", result);
      */

      // Reset form
      setData({ name: "", menu: "" });
      setShowModal(false);
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-semibold">Categories</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
        >
          <FontAwesomeIcon icon={faPlus} />
          Add category
        </button>
      </div>

      {/* TABLE */}
      <table className="table-auto w-full text-left text-white border-collapse">
        <caption className="caption-top text-lg font-semibold mb-2 text-white">
          🗂️ Categories
        </caption>
        <thead>
          <tr className="bg-gray-700 text-gray-300">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Menu Type</th>
            <th className="px-4 py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Example row */}
          <tr className="hover:bg-gray-700 transition-all duration-200">
            <td className="px-4 py-2 font-medium">Main Dish</td>
            <td className="px-4 py-2">Main Menu</td>
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

      {/* MODAL FORM */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded-2xl w-[90%] sm:w-[400px] relative shadow-2xl animate-scaleIn">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>

            <h3 className="text-xl font-semibold mb-4">Add New Category</h3>

            {/* INPUTS */}
            <label className="block mb-2 text-sm">Category Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white mb-3"
              placeholder="Enter category name"
            />

            <label className="block mb-2 text-sm">Menu Type</label>
            <select
              className="w-full text-white mb-3 bg-gray-700 p-2 rounded"
              name="menu"
              value={data.menu}
              onChange={handleChange}
            >
              <option value="">Select menu</option>
              <option value="main">Main Menu</option>
              <option value="dessert">Dessert</option>
              <option value="drink">Drink</option>
            </select>

            {/* SAVE BUTTON */}
            <button
              onClick={handleSave}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg mt-3 transition-all duration-200"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
}
