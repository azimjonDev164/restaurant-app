import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useDish from "../hooks/useDish";
import { MapPin, Phone, Clock } from "lucide-react";

function Home() {
  const { data = [] } = useDish();
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col gap-16 mt-6 px-4 md:px-6 lg:px-8">
      {/* 🌟 Banner Section */}
      <section className="relative rounded-3xl overflow-hidden shadow-2xl">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlw2XUBXXNuqDBp49NNjIanBLhSkGJG1U1n4SmIeLClihe44UOvJ74oCv4_gK73LAmd64&usqp=CAU"
          alt="Restaurant Banner"
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-6">
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-md">
            Welcome to Our Restaurant 🍷
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed mb-6">
            Enjoy mouthwatering dishes, elegant ambiance, and the perfect place
            for your gatherings. Discover the real taste of happiness!
          </p>
          <Link
            to="/tables"
            className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition"
          >
            Reserve a Table
          </Link>
        </div>
      </section>

      {/* 🍽️ Today's Specials */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          🍽️ Today’s Specials
        </h2>
        <div className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-amber-600 scrollbar-track-gray-200 pb-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-w-[280px] rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <figure className="h-48 w-full overflow-hidden rounded-t-3xl relative">
                <img
                  src={
                    item?.image?.startsWith("http")
                      ? item.image
                      : `http://localhost:3000${item.image}`
                  }
                  alt={item.name}
                  className="object-cover w-full h-full hover:scale-110 transition-transform duration-700"
                />
                <span className="absolute top-3 right-3 bg-red-500 text-xs px-3 py-1 rounded-full shadow-md">
                  NEW
                </span>
              </figure>

              {/* Content */}
              <div className="flex flex-col p-5">
                <h2 className="text-xl font-bold mb-1">{item.name}</h2>
                <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                  {"A delicious dish made with love."}
                </p>
                <span className="text-sm bg-white/10 px-3 py-1 rounded-full w-fit mb-4 border border-white/20">
                  {item?.category?.name}
                </span>

                {/* Price + Button */}
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-lg font-semibold text-yellow-400">
                    ${item.price}
                  </span>
                  <button
                    onClick={() => navigate("/tables")}
                    className="px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-full shadow-md transition"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🖼️ Gallery Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">📸 Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800",
            "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=800",
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800",
            "https://media.istockphoto.com/id/1040399894/photo/ayutthayview-in-porto-go-bangpa-in-mcdonalds-restaurant-in-ayutthaya-thailand-mcdonalds-is-an.jpg?s=612x612&w=0&k=20&c=qu8zozYSHRvpxWl4QejwUb_AVT6cYML48qo0Mzm6KUQ=",
            "https://media.istockphoto.com/id/1743685173/photo/a-beautiful-deck-with-round-wicker-armchairs-outdoor-string-lights-and-a-nature-view-at-night.jpg?s=612x612&w=0&k=20&c=7sFNB3cPE-q4vhCO65bWIdXAo4qRquIF8ksWftX-z2I=",
            "https://media.istockphoto.com/id/1275540253/photo/exterior-of-a-small-business-with-empty-tables-and-chairs-during-the-daytime.jpg?s=612x612&w=0&k=20&c=bJGwNuDIFWJ3883ydBK1Q2vNiCvf9M29XI8FCTNljB8=",
            "https://media.istockphoto.com/id/1143934136/photo/3d-render-of-cafetaria-and-restaurant.jpg?s=612x612&w=0&k=20&c=hpHImJXT89gSrBXN2Jt-y75fJixfjS4WeilDcV2GzU4=",
            "https://media.istockphoto.com/id/1178591496/photo/view-through-the-window-of-staff-and-customers-inside-buns-and-buns-restaurant-in-covent.jpg?s=612x612&w=0&k=20&c=cb7tKh_cgCx1urxBdQWq6lCc6Oc_XcMCxdgkRaTNgsc=",
          ].map((img, i) => (
            <img
              key={i}
              src={img}
              alt="Restaurant Interior"
              className="rounded-2xl object-cover h-48 w-full hover:scale-105 transition-transform shadow-md"
            />
          ))}
        </div>
      </section>

      {/* 📍 Find Us Section */}
      <section className="bg-amber-100 p-8 rounded-3xl shadow-inner text-gray-800 flex flex-col md:flex-row justify-between gap-6 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-3">📍 Visit Our Restaurant</h2>
          <div className="space-y-2 text-lg">
            <p className="flex items-center gap-2">
              <MapPin className="text-amber-700" /> 123 Tashkent Street,
              Uzbekistan
            </p>
            <p className="flex items-center gap-2">
              <Phone className="text-amber-700" /> +998 90 123 45 67
            </p>
            <p className="flex items-center gap-2">
              <Clock className="text-amber-700" /> Mon–Sun: 10:00 AM – 10:00 PM
            </p>
          </div>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.551515692248!2d69.27973777645524!3d41.31115107131292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b50e06b7f8b%3A0x51a1e33a9f92d4d3!2sTashkent!5e0!3m2!1sen!2suz!4v1696852514582!5m2!1sen!2suz"
          width="100%"
          height="250"
          allowFullScreen=""
          loading="lazy"
          className="rounded-2xl shadow-lg"
        ></iframe>
      </section>
    </div>
  );
}

export default Home;
