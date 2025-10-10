import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faReply,
  faEdit,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Dishes() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({
    name: "",
    price: "",
    categoryId: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    try {
      // Create FormData to send both text and image data
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("categoryId", data.categoryId);
      if (data.image) formData.append("image", data.image);

      console.log("Dish data to send:", data);
      // Example POST request (uncomment when backend is ready)
      /*
      const response = await fetch("http://localhost:5000/api/dishes", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Server response:", result);
      */

      // Reset form and close modal
      setData({ name: "", price: "", categoryId: "", image: null });
      setShowModal(false);
    } catch (error) {
      console.error("Error saving dish:", error);
    }
  };

  return (
    <>
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

      {/* MODAL FORM */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded-2xl w-[90%] sm:w-[400px] relative shadow-2xl animate-scaleIn">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setShowModal(false)}
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
            />

            <label className="block mb-2 text-sm">Price</label>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white mb-3"
              placeholder="Enter price"
            />

            <label className="block mb-2 text-sm">Category</label>
            <select
              className="w-full text-white mb-3 bg-gray-700 p-2 rounded"
              name="categoryId"
              value={data.categoryId}
              onChange={handleChange}
            >
              <option value="">Select category</option>
              <option value="main">Main Dish</option>
              <option value="dessert">Dessert</option>
              <option value="drink">Drink</option>
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
