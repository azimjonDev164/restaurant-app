import { useState, useEffect } from "react";
import { useSearch } from "../context/SearchContext";
import useDish from "../hooks/useDish";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const { search, setSearch } = useSearch(); // make sure SearchContext provides setSearch
  const { data = [] } = useDish();
  const [filterData, setFilterData] = useState(data); // local state for input typing
  const navigate = useNavigate();
  const PORT = import.meta.env.VITE_PORT;
  // Filter data live as user types

  useEffect(() => {
    const trimmed = search.trim().toLowerCase();
    setFilterData(
      trimmed
        ? data.filter(
            (t) =>
              t.name.toLowerCase().includes(trimmed) ||
              t.category?.name.toLowerCase().includes(trimmed)
          )
        : data
    );
  }, [search]);

  return (
    <div className="text-white mt-3">
      {/* Results */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
        {filterData.length > 0 ? (
          filterData.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-w-[280px] rounded-3xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer flex flex-col"
            >
              {/* Image */}
              <figure className="h-48 w-full overflow-hidden rounded-t-3xl relative">
                <img
                  src={
                    item?.image?.startsWith("http")
                      ? item.image
                      : `${PORT}${item.image}`
                  }
                  alt="Special Dish"
                  className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 bg-red-500 text-xs px-3 py-1 rounded-full shadow-md">
                  NEW
                </span>
              </figure>

              {/* Content */}
              <div className="flex flex-col p-5 flex-1">
                <h2 className="text-xl font-bold mb-2 flex justify-between items-center">
                  {item.name}
                </h2>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="px-3 py-1 bg-white/10 text-gray-200 text-xs rounded-full border border-white/20">
                    {item?.category?.name}
                  </span>
                </div>

                {/* Price + Button */}
                <div className="flex justify-between items-center mt-5">
                  <span className="text-lg font-semibold text-yellow-400">
                    ${item.price}
                  </span>
                  <button
                    onClick={() => navigate("/tables")}
                    className="px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-full shadow transition cursor-pointer"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 mb-4">
            No results found for{" "}
            <span className="text-yellow-400">"{search}"</span>
          </p>
        )}
      </div>
    </div>
  );
}
