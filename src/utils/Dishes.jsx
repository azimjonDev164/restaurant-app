import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faReply,
  faEdit,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useDish from "../hooks/useDish";
import useCategory from "../hooks/useCategory";

export default function Dishes() {
  const { data: categories = [] } = useCategory();
  const {
    data: dishes = [],
    loading,
    err,
    createDish,
    deleteDish,
    updateDish,
  } = useDish();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [data, setData] = useState({
    name: "",
    price: "",
    categoryId: "",
    image: null,
  });

  // 🟩 Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 🟩 Save new dish
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      editingId
        ? formData.append("category", data.categoryId)
        : formData.append("categoryId", data.categoryId);
      if (data.image) formData.append("image", data.image);
      if (editingId) {
        await updateDish(editingId, formData);
      } else {
        // CREATE mode
        await createDish(formData);
      }
      setData({ name: "", price: "", categoryId: "", image: null });
      document.querySelector('input[name="image"]').value = "";
      setShowModal(false);
    } catch (error) {
      console.error("Error saving dish:", error);
    }
  };

  // 🗑 Delete dish
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this dish?")) {
      deleteDish(id);
    }
  };

  // ✅ Open modal in edit mode
  const handleEdit = (item) => {
    console.log(item);
    setData({
      name: item.name,
      price: item.price,
      categoryId: item?.category?._id || "",
      image: item?.image,
    });
    setEditingId(item._id);
    setShowModal(true);
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-semibold">Dishes</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer"
        >
          <FontAwesomeIcon icon={faPlus} />
          Add dish
        </button>
      </div>

      {/* TABLE */}
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
          {loading && (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-400">
                Loading dishes...
              </td>
            </tr>
          )}
          {err && (
            <tr>
              <td colSpan="5" className="text-center py-4 text-red-400">
                {err}
              </td>
            </tr>
          )}
          {!loading &&
            !err &&
            dishes.length > 0 &&
            dishes.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-gray-700 transition-all duration-200"
              >
                <td className="px-4 py-2">
                  <img
                    className="w-[60px] h-[60px] rounded-2xl object-cover"
                    src={
                      item?.image?.startsWith("http")
                        ? item.image
                        : `http://localhost:3000${item.image}`
                    }
                    alt={item.name}
                  />
                </td>
                <td className="px-4 py-2 font-medium">{item?.name}</td>
                <td className="px-4 py-2">{item?.price}</td>
                <td className="px-4 py-2">{item?.category?.name}</td>
                <td className="px-4 py-2 flex gap-3 justify-center">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-400 hover:text-red-500 cursor-pointer"
                  >
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
            ))}
          {!loading && !err && dishes.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-400">
                No dishes found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* MODAL FORM */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <form
            onSubmit={handleSave}
            className="bg-gray-900 p-6 rounded-2xl w-[90%] sm:w-[400px] relative shadow-2xl animate-scaleIn"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setShowModal(false)}
              type="button"
              className="absolute top-3 right-3 text-gray-400 hover:text-white cursor-pointer"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>

            {/* MODAL TITLE */}
            <h3 className="text-xl font-semibold mb-4">Add New Dish</h3>

            {/* INPUTS */}
            <label className="block mb-2 text-sm">Dish Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white mb-3"
              placeholder="Enter dish name"
              required
            />

            <label className="block mb-2 text-sm">Price</label>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white mb-3"
              placeholder="Enter price"
              required
            />

            <label className="block mb-2 text-sm">Category</label>
            <select
              className="w-full text-white mb-3 bg-gray-700 p-2 rounded"
              name="categoryId"
              value={data.categoryId}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
              {categories.length > 0 &&
                categories.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
            </select>

            <label className="block mb-2 text-sm">Image</label>
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="file-input file-input-ghost w-full mb-3"
            />

            {/* SAVE BUTTON */}
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg mt-3 transition-all duration-200 cursor-pointer"
            >
              {editingId ? "Update dish" : "Save"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
