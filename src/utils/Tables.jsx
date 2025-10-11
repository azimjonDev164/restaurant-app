import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useTable from "../hooks/useTable";

export default function Tables() {
  const { data = [], loading, err, createTable, updateTable } = useTable();

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null); // ✅ to detect edit mode
  const [formData, setFormData] = useState({
    name: "",
    status: "available",
  });

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Save or update table
  const handleSave = async () => {
    try {
      if (editingId) {
        // UPDATE mode
        const status = formData.status === "available";
        await updateTable(editingId, status);
      } else {
        // CREATE mode
        await createTable(Number(formData.name));
      }

      setFormData({ name: "", status: "available" });
      setEditingId(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error saving table:", error);
    }
  };

  // ✅ Open modal in edit mode
  const handleEdit = (item) => {
    setFormData({
      name: item.number,
      status: item.isAvailable ? "available" : "booked",
    });
    setEditingId(item._id);
    setShowModal(true);
  };

  // ✅ Close modal
  const closeModal = () => {
    setFormData({ name: "", status: "available" });
    setEditingId(null);
    setShowModal(false);
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
          {loading ? (
            <tr>
              <td colSpan="3" className="text-center py-4 text-gray-400">
                Loading tables...
              </td>
            </tr>
          ) : err ? (
            <tr>
              <td colSpan="3" className="text-center py-4 text-red-400">
                {err}
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((item) => (
              <tr
                key={item?._id}
                className="hover:bg-gray-700 transition-all duration-200"
              >
                <td className="px-4 py-2 font-medium">Table {item?.number}</td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    item?.isAvailable ? "text-green-400" : "text-yellow-400"
                  }`}
                >
                  {item?.isAvailable ? "Available" : "Booked"}
                </td>
                <td className="px-4 py-2 flex gap-3 justify-center">
                  <button className="text-red-400 hover:text-red-500">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-green-400 hover:text-green-500 cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4 text-gray-400">
                No tables found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* MODAL FORM */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded-2xl w-[90%] sm:w-[400px] relative shadow-2xl animate-scaleIn">
            {/* CLOSE BUTTON */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>

            <h3 className="text-xl font-semibold mb-4">
              {editingId ? "Edit Table" : "Add New Table"}
            </h3>

            {/* INPUTS */}
            <label className="block mb-2 text-sm">Table Number</label>
            <input
              type="number"
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
              <option value="booked">Booked</option>
            </select>

            {/* SAVE BUTTON */}
            <button
              onClick={handleSave}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg mt-3 transition-all duration-200"
            >
              {editingId ? "Update Table" : "Save"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
