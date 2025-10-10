import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Menu() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
  });

  // Temporary local data
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: "Pasta Combo", price: 20 },
    { id: 2, name: "Pizza Margherita", price: 15 },
  ]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!formData.name || !formData.price) {
      alert("Please fill all fields");
      return;
    }

    // For now, just add locally (later connect to backend)
    const newItem = {
      id: menuItems.length + 1,
      name: formData.name,
      price: parseFloat(formData.price),
    };

    setMenuItems((prev) => [...prev, newItem]);
    setFormData({ name: "", price: "" });
    setShowModal(false);

    console.log("New Menu Added:", newItem);

    // Later: send to backend
    /*
    const res = await fetch("/api/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const result = await res.json();
    console.log(result);
    */
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-semibold">Menu</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
        >
          <FontAwesomeIcon icon={faPlus} />
          Add Menu
        </button>
      </div>

      {/* Table */}
      <table className="table-auto w-full text-left text-white">
        <caption className="caption-top text-lg font-semibold mb-2 text-white">
          📖 Menu
        </caption>
        <thead>
          <tr className="bg-gray-700 text-gray-300">
            <th className="px-4 py-2">Menu Item</th>
            <th className="px-4 py-2">Price ($)</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-gray-700 border-b border-gray-800"
            >
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">${item.price.toFixed(2)}</td>
              <td className="px-4 py-2 flex gap-3">
                <button className="text-yellow-400 hover:text-yellow-500">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="text-red-500 hover:text-red-600">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

            <h3 className="text-xl font-semibold mb-4">Add New Menu Item</h3>

            <label className="block mb-2 text-sm">Menu Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white mb-3"
              placeholder="Enter menu item name"
            />

            <label className="block mb-2 text-sm">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white mb-3"
              placeholder="Enter price"
            />

            <button
              onClick={handleSubmit}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg mt-3"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
}
