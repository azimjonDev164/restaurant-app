import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const filters = ["All", "Booked"];
const homes = ["rooms", "tables"];

export default function FloorPlan() {
  const [filter, setFilter] = useState("All");
  const [homeFil, setHomeFilter] = useState("rooms");
  const navigate = useNavigate();

  // Sample data (you can fetch from API later)
  const tables = [
    { id: 1, seats: 4, type: "rooms", status: "Booked", guest: "A" },
    { id: 2, seats: 6, type: "rooms", status: "Available", guest: null },
    { id: 3, seats: 2, type: "tables", status: "Booked", guest: "B" },
    { id: 4, seats: 8, type: "rooms", status: "Available", guest: null },
    { id: 5, seats: 5, type: "tables", status: "Booked", guest: "C" },
  ];

  const filteredTables =
    filter === "All"
      ? tables.filter((t) => t.type == homeFil)
      : tables
          .filter((t) => t.type == homeFil)
          .filter((t) => t.status == "Booked");

  console.log(filteredTables);

  return (
    <div className="min-h-screen p-6">
      {/* Filters */}
      <div className="flex justify-between mb-6 sticky top-0 z-50 py-2 bg-gray-900">
        <div className="flex gap-3">
          {homes.map((item) => (
            <button
              key={item}
              onClick={() => setHomeFilter(item)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 cursor-pointer ${
                item === homeFil
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 cursor-pointer ${
                item === filter
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Floor Plan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTables.map((table) => (
          <div
            key={table.id}
            onClick={() => {
              return navigate(`/tables/${table.id}`);
            }}
            className="bg-gray-800 rounded-2xl p-5 shadow-xl hover:shadow-2xl transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-lg font-semibold">
                {table.type == "rooms" ? "Room" : "Table"} {table.id}
              </h2>
              <span
                className={`text-xs px-3 py-1 rounded-full font-semibold ${
                  table.status === "Booked"
                    ? "bg-green-200 text-green-700"
                    : "bg-yellow-200 text-yellow-700"
                }`}
              >
                {table.status}
              </span>
            </div>

            {/* Body */}
            <div className="flex justify-center items-center mb-4">
              {table.guest ? (
                <div className="bg-indigo-600 w-16 h-16 flex items-center justify-center text-2xl font-bold text-white rounded-full shadow-md">
                  {table.guest}
                </div>
              ) : (
                <div className="bg-gray-600 w-16 h-16 flex items-center justify-center text-xl font-medium text-gray-300 rounded-full shadow-md">
                  Empty
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="text-center">
              <p className="text-gray-300 font-medium">
                Seats: <span className="font-bold">{table.seats}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
