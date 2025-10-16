import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faShoppingCart,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import useDish from "../hooks/useDish";
import useCategory from "../hooks/useCategory";
import useOrder from "../hooks/useOrder"; // ✅ Import here
import { useNavigate } from "react-router-dom";

function Order({ tableId, reservationId }) {
  const { createOrder, userData } = useOrder(); // ✅ Access order logic
  const { data: filters = [] } = useCategory();
  const { data: dishes = [] } = useDish();
  const [filter, setFilter] = useState("");
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const PORT = import.meta.env.VITE_PORT;

  if (!filter && filters.length > 0) setFilter(filters[0].name.toLowerCase());

  const productList = dishes.filter(
    (dish) => dish.category?.name?.toLowerCase() === filter
  );

  const increase = (id) =>
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));

  const decrease = (id) =>
    setCart((prev) => {
      if (!prev[id]) return prev;
      const updated = { ...prev, [id]: prev[id] - 1 };
      if (updated[id] <= 0) delete updated[id];
      return updated;
    });

  const getTotalPrice = () =>
    Object.entries(cart).reduce((total, [id, qty]) => {
      const product = dishes.find((p) => p._id === id);
      return product ? total + product.price * qty : total;
    }, 0);

  // ✅ Handle order submission
  const handleOrderNow = async () => {
    setLoading(true);
    try {
      const items = Object.entries(cart).map(([id, qty]) => ({
        dishId: id,
        quantity: qty,
      }));

      const res = await createOrder(userData._id, items, reservationId);
      if (res?.order) {
        alert("✅ Order placed successfully!");
        setCart({});
      }
      navigate("/orders");
    } catch (err) {
      alert("❌ Failed to place order. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 md:px-12 py-8 min-h-screen text-white font-sans">
      {/* LEFT - Products */}
      <div className="flex-1 flex flex-col gap-8">
        {/* FILTER BUTTONS */}
        <div className="flex gap-4 sticky top-0 z-20 bg-gray-900/95 backdrop-blur-sm py-4 px-4 rounded-xl shadow-lg">
          {filters.map((item) => (
            <button
              key={item._id}
              onClick={() => setFilter(item.name.toLowerCase())}
              className={`px-6 py-2.5 rounded-full font-medium capitalize text-sm tracking-wide transition-all duration-300 ${
                item.name.toLowerCase() === filter
                  ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-lg"
                  : "bg-gray-700/80 text-gray-200 hover:bg-gray-600 hover:text-white"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* PRODUCTS GRID */}
        <div className="flex flex-wrap gap-6">
          {productList.map((item) => (
            <div
              key={item._id}
              className="group w-[270px] h-[350px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl border border-gray-700 hover:border-yellow-400 hover:shadow-2xl transition-all duration-300 p-5 flex flex-col"
            >
              <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4">
                <img
                  src={
                    item?.image?.startsWith("http")
                      ? item.image
                      : `${PORT}${item.image}`
                  }
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col justify-between flex-1">
                <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                  <FontAwesomeIcon
                    icon={faUtensils}
                    className="text-yellow-400"
                  />
                  {item.name}
                </h2>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold text-yellow-400">
                    ${item.price.toFixed(2)}
                  </span>
                  {!cart[item._id] ? (
                    <button
                      onClick={() => increase(item._id)}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-sm font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                    >
                      <FontAwesomeIcon icon={faPlus} /> Add
                    </button>
                  ) : (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => decrease(item._id)}
                        className="w-9 h-9 flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600 transition"
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span className="text-base font-semibold text-white">
                        {cart[item._id]}
                      </span>
                      <button
                        onClick={() => increase(item._id)}
                        className="w-9 h-9 flex items-center justify-center bg-yellow-500 rounded-full hover:bg-yellow-600 transition"
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT - CART */}
      <div className="w-full md:w-[360px] sticky top-1 bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-6 flex flex-col h-[85vh]">
        <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
          <FontAwesomeIcon icon={faShoppingCart} className="text-yellow-400" />
          Your Order
        </h3>
        <p className="text-gray-300 mb-5 text-sm">Table {tableId}</p>

        {Object.keys(cart).length === 0 ? (
          <p className="text-gray-400 flex-1 flex items-center justify-center text-center">
            No items added yet. Start exploring our menu!
          </p>
        ) : (
          <>
            <ul className="flex flex-col gap-3 flex-1 overflow-y-auto pr-2 mb-4">
              {Object.entries(cart).map(([id, qty]) => {
                const product = dishes.find((p) => p._id === id);
                if (!product) return null;
                return (
                  <li
                    key={id}
                    className="flex justify-between items-center bg-gray-800/70 px-4 py-3 rounded-xl border border-gray-700 hover:bg-gray-800 transition"
                  >
                    <span className="text-sm text-gray-200">
                      {product.name} × {qty}
                    </span>
                    <span className="font-semibold text-yellow-400">
                      ${(product.price * qty).toFixed(2)}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="border-t border-gray-700 pt-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-200">
                  Total:
                </span>
                <span className="text-xl font-bold text-yellow-400">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
            </div>
          </>
        )}

        <button
          onClick={handleOrderNow}
          disabled={Object.keys(cart).length === 0 || loading}
          className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 py-3 rounded-full font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Placing Order..." : "Order Now"}
        </button>
      </div>
    </div>
  );
}

export default Order;
