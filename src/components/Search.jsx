import { useEffect, useState } from "react";
import { useSearch } from "../context/SearchContext";

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

export default function Search() {
  const { search, navigate } = useSearch();
  const [data, setData] = useState([]);
  const filterData = [
    ...products["foods"],
    ...products["drinks"],
    ...products["desserts"],
  ];

  useEffect(() => {
    if (!search.length) {
      navigate("/");
    } else {
      setData(
        filterData.filter(
          (item) =>
            item.name
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase()) ||
            item.description
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase())
        )
      );
    }
  }, [search]);

  return (
    <div className="text-white">
      <h1 className="text-3xl text-white capitalize">search</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col border border-gray-700"
          >
            {/* Image */}
            <figure className="h-48 overflow-hidden rounded-t-3xl relative">
              <img
                src={item.image}
                onError={(e) =>
                  (e.target.src =
                    "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
                } // your default
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
