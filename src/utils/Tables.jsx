import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faReply,
  faEdit,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Tables() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    status: "available",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      console.log("Table data to send:", formData);

      // Example POST request
      /*
      const res = await fetch("http://localhost:5000/api/tables", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      console.log("Server response:", result);
      */

      setFormData({ name: "", status: "available" });
      setShowModal(false);
    } catch (error) {
      console.error("Error saving table:", error);
    }
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-semibold">Tables</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
        >
          <FontAwesomeIcon icon={faPlus} />
          Add table
        </button>
      </div>

      {/* TABLE */}
      <table className="table-auto w-full text-left text-white border-collapse">
        <caption className="caption-top text-lg font-semibold mb-2 text-white">
          🪑 Tables
        </caption>
        <thead>
          <tr className="bg-gray-700 text-gray-300">
            <th className="px-4 py-2">Table Number</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Example row */}
          <tr className="hover:bg-gray-700 transition-all duration-200">
            <td className="px-4 py-2 font-medium">Table 1</td>
            <td className="px-4 py-2 text-green-400">Available</td>
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

            <h3 className="text-xl font-semibold mb-4">Add New Table</h3>

            {/* INPUTS */}
            <label className="block mb-2 text-sm">Table Name / Number</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white mb-3"
              placeholder="Enter table name or number"
            />

            <label className="block mb-2 text-sm">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full text-white mb-3 bg-gray-700 p-2 rounded"
            >
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="reserved">Reserved</option>
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
