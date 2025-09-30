import { useState } from "react";

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
        "https://t4.ftcdn.net/jpg/01/07/93/25/360_F_107932517_bRTDt5PCP4mOxlnsifzR6kXxkR3xi8QA.jpg",
      tags: ["Drink", "Healthy"],
      status: "NEW",
    },
    {
      id: 4,
      name: "Iced Coffee",
      description: "Cold brewed coffee with a touch of sweetness.",
      price: 5,
      image:
        "https://t4.ftcdn.net/jpg/01/07/93/25/360_F_107932517_bRTDt5PCP4mOxlnsifzR6kXxkR3xi8QA.jpg",
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

function Order() {
  const [filter, setFilter] = useState("foods");
  const productList = products[filter] || [];
  const [cart, setCart] = useState({}); // { id: quantity }

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

  return (
    <div className="flex flex-col-reverse md:flex-row gap-6 md:px-8 py-6 bg-[#101828]">
      {/* Left Side - Product List */}
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto h-[80vh]">
        {/* Filter Buttons */}
        <div className="flex gap-3 sticky top-0 z-[999] bg-[#101828] py-2 pl-3">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-5 py-2 rounded-3xl font-medium capitalize transition-all duration-300 cursor-pointer ${
                item === filter
                  ? "bg-yellow-600 ring-2 ring-yellow-400 text-white shadow-lg"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Product Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
          {productList.map((item) => (
            <div
              key={item.id}
              className="bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col border border-gray-700"
            >
              {/* Image */}
              <figure className="h-48 overflow-hidden rounded-t-3xl relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 bg-yellow-500 text-white text-xs px-3 py-1 rounded-full shadow">
                  {item.status}
                </span>
              </figure>

              {/* Content */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                <p className="text-sm text-gray-300 flex-1 leading-relaxed">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs bg-white/10 text-gray-200 rounded-full border border-gray-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Price + Quantity Controls */}
                <div className="flex justify-between items-center mt-5">
                  <span className="text-lg font-bold text-yellow-400">
                    ${item.price}
                  </span>

                  {!cart[item.id] ? (
                    <button
                      onClick={() => increase(item.id)}
                      className="px-5 py-2 bg-yellow-500 text-white text-sm font-medium rounded-full shadow hover:bg-yellow-600 transition"
                    >
                      Add
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decrease(item.id)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-700 text-white rounded-full hover:bg-gray-600 transition"
                      >
                        –
                      </button>
                      <span className="text-lg font-semibold">
                        {cart[item.id]}
                      </span>
                      <button
                        onClick={() => increase(item.id)}
                        className="w-8 h-8 flex items-center justify-center bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Order Summary */}
      {/* Right Side - Order Summary */}
      <div className="w-[300px] h-[80vh] bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl shadow-lg p-5 flex flex-col overflow-y-auto border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">🛒 Your Order</h3>
        <h3 className="text-xl font-bold text-white mb-4">Table / Room 1</h3>
        {Object.keys(cart).length === 0 ? (
          <p className="text-gray-400 flex-1">No items added yet.</p>
        ) : (
          <ul className="flex flex-col gap-3 flex-1">
            {Object.entries(cart).map(([id, qty]) => {
              const product = Object.values(products)
                .flat()
                .find((p) => p.id === +id);
              return (
                <li
                  key={id}
                  className="flex justify-between items-center text-white"
                >
                  <span>
                    {product.name} x {qty}
                  </span>
                  <span className="font-semibold">${product.price * qty}</span>
                </li>
              );
            })}
          </ul>
        )}

        {/* Order Now Button */}
        <button className="mt-4 text-lg btn btn-warning w-full">
          Order Now
        </button>
      </div>
    </div>
  );
}

export default Order;
