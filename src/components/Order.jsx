import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faShoppingCart,
  faTags,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

const filters = ["foods", "drinks", "desserts"];

const products = {
  foods: [
    {
      id: 1,
      name: "Classic Burger",
      description: "Juicy grilled beef patty with cheese and fresh veggies.",
      price: 12,
      image:
        "https://thedeliciousspoon.com/wp-content/uploads/2019/04/Burger-pic-pin-1.jpg",
      tags: ["Food", "Special"],
      status: "NEW",
    },
    {
      id: 2,
      name: "Grilled Steak",
      description: "Perfectly grilled steak with herbs and spices.",
      price: 25,
      image:
        "https://www.recipetineats.com/wp-content/uploads/2018/11/Grilled-Steak.jpg",
      tags: ["Food", "Premium"],
      status: "HOT",
    },
  ],
  drinks: [
    {
      id: 3,
      name: "Fresh Orange Juice",
      description: "Refreshing juice made from organic oranges.",
      price: 6,
      image:
        "https://cdn.loveandlemons.com/wp-content/uploads/2021/06/orange-juice.jpg",
      tags: ["Drink", "Healthy"],
      status: "NEW",
    },
    {
      id: 4,
      name: "Iced Coffee",
      description: "Cold brewed coffee with a touch of sweetness.",
      price: 5,
      image:
        "https://cdn.loveandlemons.com/wp-content/uploads/2021/06/iced-coffee.jpg",
      tags: ["Drink", "Coffee"],
      status: "POPULAR",
    },
  ],
  desserts: [
    {
      id: 5,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with creamy layers.",
      price: 8,
      image:
        "https://cdn.loveandlemons.com/wp-content/uploads/2021/06/summer-desserts.jpg",
      tags: ["Dessert", "Sweet"],
      status: "BEST",
    },
    {
      id: 6,
      name: "Vanilla Ice Cream",
      description: "Classic vanilla ice cream topped with caramel sauce.",
      price: 7,
      image:
        "https://cdn.loveandlemons.com/wp-content/uploads/2021/06/summer-desserts.jpg",
      tags: ["Dessert", "Cold"],
      status: "NEW",
    },
  ],
};

function Order({ tableId }) {
  const [filter, setFilter] = useState("foods");
  const [cart, setCart] = useState({});

  const productList = products[filter] || [];

  const increase = (id) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decrease = (id) => {
    setCart((prev) => {
      if (!prev[id]) return prev;
      const updated = { ...prev, [id]: prev[id] - 1 };
      if (updated[id] <= 0) delete updated[id];
      return updated;
    });
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [id, qty]) => {
      const product = Object.values(products)
        .flat()
        .find((p) => p.id === +id);
      return total + product.price * qty;
    }, 0);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 md:px-12 py-8 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white font-sans">
      {/* LEFT - Products */}
      <div className="flex-1 flex flex-col gap-8">
        {/* FILTER TABS */}
        <div className="flex gap-4 sticky top-0 z-20 bg-gray-900/95 backdrop-blur-sm py-4 px-4 rounded-xl shadow-lg">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-6 py-2.5 rounded-full font-medium capitalize text-sm tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 ${
                item === filter
                  ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-lg"
                  : "bg-gray-700/80 text-gray-200 hover:bg-gray-600 hover:text-white"
              }`}
              aria-pressed={item === filter}
            >
              {item}
            </button>
          ))}
        </div>

        {/* PRODUCTS GRID */}
        <div className="flex flex-wrap gap-6">
          {productList.map((item) => (
            <div
              key={item.id}
              className="group w-[270px] h-[350px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl border border-gray-700 hover:border-yellow-400 hover:shadow-2xl transition-all duration-300 p-5 flex flex-col"
              role="article"
              aria-labelledby={`product-${item.id}`}
            >
              {/* IMAGE */}
              <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
                    item.status === "NEW"
                      ? "bg-green-500"
                      : item.status === "HOT"
                      ? "bg-red-500"
                      : item.status === "POPULAR"
                      ? "bg-blue-500"
                      : "bg-yellow-500"
                  } text-white`}
                >
                  {item.status}
                </span>
              </div>

              {/* CONTENT */}
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h2
                    id={`product-${item.id}`}
                    className="text-xl font-bold flex items-center gap-2 text-white"
                  >
                    <FontAwesomeIcon
                      icon={faUtensils}
                      className="text-yellow-400"
                    />
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-300 line-clamp-2 mt-2">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gray-700/60 px-2.5 py-1 rounded-full flex items-center gap-1.5 text-gray-200 border border-gray-600"
                      >
                        <FontAwesomeIcon
                          icon={faTags}
                          className="text-yellow-400"
                        />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* PRICE + CONTROLS */}
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold text-yellow-400">
                    ${item.price.toFixed(2)}
                  </span>
                  {!cart[item.id] ? (
                    <button
                      onClick={() => increase(item.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-sm font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      aria-label={`Add ${item.name} to cart`}
                    >
                      <FontAwesomeIcon icon={faPlus} /> Add
                    </button>
                  ) : (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => decrease(item.id)}
                        className="w-9 h-9 flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600 transition focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span className="text-base font-semibold text-white">
                        {cart[item.id]}
                      </span>
                      <button
                        onClick={() => increase(item.id)}
                        className="w-9 h-9 flex items-center justify-center bg-yellow-500 rounded-full hover:bg-yellow-600 transition focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        aria-label={`Increase quantity of ${item.name}`}
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

      {/* RIGHT - ORDER SUMMARY */}
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
                const product = Object.values(products)
                  .flat()
                  .find((p) => p.id === +id);
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
          className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 py-3 rounded-full font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={Object.keys(cart).length === 0}
          aria-label="Proceed to order"
        >
          Order Now
        </button>
      </div>
    </div>
  );
}

export default Order;
