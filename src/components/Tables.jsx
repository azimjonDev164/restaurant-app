import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useTable from "../hooks/useTable";

const filters = ["All", "Booked"];

export default function FloorPlan() {
  const { data: tables = [], loading, err } = useTable();
  const [filter, setFilter] = useState("All");
  const [filterData, setFilterData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const filterTables = async () => {
      if (filter === "All") {
        setFilterData(tables);
      } else if (filter === "Booked") {
        // ✅ Instead of calling API again, you can just filter existing data:
        const booked = tables.filter((t) => !t.isAvailable);
        setFilterData(booked);
      }
    };

    filterTables();
  }, [filter, tables]);

  // ✅ Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-200 text-lg">
        Loading tables...
      </div>
    );
  }

  // ✅ Error state
  if (err) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">
        Error: {err}
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      {/* Filters */}
      <div className="flex justify-between mb-6 sticky top-0 z-50 py-2 bg-gray-900">
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
        {filterData.map((table) => (
          <div
            key={table._id}
            onClick={() => navigate(`/tables/${table._id}`)}
            className="bg-gray-800 rounded-2xl p-5 shadow-xl hover:shadow-2xl transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-lg font-semibold">
                Table {table.number}
              </h2>
              <span
                className={`text-xs px-3 py-1 rounded-full font-semibold ${
                  table.isAvailable
                    ? "bg-green-200 text-green-700"
                    : "bg-yellow-200 text-yellow-700"
                }`}
              >
                {table.isAvailable ? "Available" : "Booked"}
              </span>
            </div>

            <div className="flex justify-center items-center mb-4">
              {!table.isAvailable ? (
                <div className="bg-indigo-600 w-16 h-16 flex items-center justify-center text-xl font-bold text-white rounded-full shadow-md">
                  Taken
                </div>
              ) : (
                <div className="bg-gray-600 w-16 h-16 flex items-center justify-center text-xl font-medium text-gray-300 rounded-full shadow-md">
                  Empty
                </div>
              )}
            </div>

            <div className="text-center">
              <p className="text-gray-300 font-medium">
                Seats: <span className="font-bold">{table.seat}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
