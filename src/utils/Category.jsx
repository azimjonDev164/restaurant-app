import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useCategory from "../hooks/useCategory";
import useMenu from "../hooks/useMenu";

export default function Category() {
  const { data: menu = [] } = useMenu();
  const {
    data = [],
    loading,
    err,
    createCategory,
    deleteCategory,
    updateCategory,
  } = useCategory();

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    menu: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await updateCategory(editingId, formData);
      } else {
        await createCategory(formData.name, formData.menu); // if your hook supports it
      }

      setFormData({ name: "", menu: "" });
      setShowModal(false);
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteCategory(id);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      menu: item?.menu?._id,
    });
    setEditingId(item._id);
    setShowModal(true);
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
          {loading ? (
            <tr>
              <td colSpan="3" className="text-center py-4 text-gray-400">
                Loading categories...
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
                key={item._id}
                className="hover:bg-gray-700 border-b border-gray-800"
              >
                <td className="px-4 py-2">{item?.name}</td>
                <td className="px-4 py-2">{item?.menu?.name}</td>
                <td className="px-4 py-2 flex gap-3">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-yellow-400 hover:text-yellow-500 cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500 hover:text-red-600 cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4 text-gray-400">
                No categories found
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
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white mb-3"
              placeholder="Enter category name"
            />

            <label className="block mb-2 text-sm">Menu Type</label>
            <select
              className="w-full text-white mb-3 bg-gray-700 p-2 rounded"
              name="menu"
              value={formData.menu}
              onChange={handleChange}
            >
              <option value="">Select Menu</option>
              {menu.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>

            {/* SAVE BUTTON */}
            <button
              onClick={handleSave}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg mt-3 transition-all duration-200"
            >
              {editingId ? "Update category" : "Save"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
