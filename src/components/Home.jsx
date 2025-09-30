import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

function Home() {
  const cards = [6, 8, 6, 5, 5, 6, 2, 3];
  const { data, loading } = useFetch();

  return (
    <div className="h-auto w-full flex flex-col gap-10 mt-4 px-4 md:px-4 lg:px-6">
      {/* Banner Section */}
      <div className="banner p-10 rounded-3xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-800 text-white shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4 text-center md:text-left">
            <h1 className="text-4xl font-extrabold tracking-wide drop-shadow-md">
              Welcome to Our Restaurant
            </h1>
            <p className="max-w-2xl text-gray-100 leading-relaxed text-lg">
              Enjoy delicious food, cozy atmosphere, and a place where every
              moment becomes special. <br /> Book your table now and experience
              the taste of happiness!
            </p>
          </div>
          <button className="btn btn-warning px-8 py-3 text-lg text-white shadow-lg hover:scale-110 transition-transform rounded-full">
            <Link to={"/order"}>Book Now</Link>
          </button>
        </div>
      </div>

      {/* Section Title */}
      <h2 className="text-2xl font-bold text-gray-800 tracking-wide">
        🍽️ Today’s Specials
      </h2>

      {/* Horizontal Scroll Cards */}
      <div className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-amber-600 scrollbar-track-gray-300 pb-4">
        {cards.map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-w-[280px] rounded-3xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer flex flex-col"
          >
            {/* Image */}
            <figure className="h-48 w-full overflow-hidden rounded-t-3xl relative">
              <img
                src="https://thedeliciousspoon.com/wp-content/uploads/2019/04/Burger-pic-pin-1.jpg"
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
                Special Dish
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed flex-1">
                Discover our chef’s special dishes prepared with love and fresh
                ingredients.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-3 py-1 bg-white/10 text-gray-200 text-xs rounded-full border border-white/20">
                  Food
                </span>
                <span className="px-3 py-1 bg-white/10 text-gray-200 text-xs rounded-full border border-white/20">
                  Special
                </span>
              </div>

              {/* Price + Button */}
              <div className="flex justify-between items-center mt-5">
                <span className="text-lg font-semibold text-yellow-400">
                  $12.50
                </span>
                <button className="px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-full shadow transition">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Another Category Section */}
      <h2 className="text-2xl font-bold text-gray-800 tracking-wide">
        🥗 Fresh & Healthy
      </h2>

      <div className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-amber-600 scrollbar-track-gray-300 pb-4">
        {cards.map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-w-[280px] rounded-3xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer flex flex-col"
          >
            {/* Image */}
            <figure className="h-48 w-full overflow-hidden rounded-t-3xl relative">
              <img
                src="https://t4.ftcdn.net/jpg/01/07/93/25/360_F_107932517_bRTDt5PCP4mOxlnsifzR6kXxkR3xi8QA.jpg"
                alt="Fresh Salad"
                className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow">
                NEW
              </span>
            </figure>

            {/* Content */}
            <div className="flex flex-col p-5 flex-1">
              <h2 className="text-xl font-bold mb-2">Fresh Salad</h2>
              <p className="text-sm text-gray-300 leading-relaxed flex-1">
                Taste our fresh, healthy salads made with organic ingredients
                and served with love.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-3 py-1 bg-white/10 text-green-300 text-xs rounded-full border border-green-400/30">
                  Healthy
                </span>
                <span className="px-3 py-1 bg-white/10 text-yellow-300 text-xs rounded-full border border-yellow-400/30">
                  Salad
                </span>
              </div>

              {/* Price + Button */}
              <div className="flex justify-between items-center mt-5">
                <span className="text-lg font-semibold text-yellow-400">
                  $7.99
                </span>
                <button className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-full shadow transition">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
