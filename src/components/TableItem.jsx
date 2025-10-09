import { useParams } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChair,
  faCalendarCheck,
  faClock,
  faCheckCircle,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import Order from "./Order";

export default function TableItem() {
  const { id } = useParams();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([2, 5]); // sample booked

  const reservations = [
    { id: 1, date: "2025-09-29", hour: "18:00 - 20:00" },
    { id: 2, date: "2025-09-29", hour: "20:00 - 22:00" },
    { id: 3, date: "2025-09-30", hour: "19:00 - 21:00" },
    { id: 4, date: "2025-09-30", hour: "21:00 - 23:00" },
    { id: 5, date: "2025-09-30", hour: "23:00 - 1:00" },
  ];

  const handleBook = (slotId) => {
    if (bookedSlots.includes(slotId)) return;
    setBookedSlots([...bookedSlots, slotId]);
    setSelectedSlot(slotId);
  };

  const slot = reservations.find((s) => s.id === selectedSlot);

  return (
    <div className="pt-8 pb-3 w-full mx-auto min-h-screen text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <FontAwesomeIcon icon={faChair} className="text-yellow-400" />
          Table #{id}
        </h1>
        <p className="text-gray-400">Manage bookings & orders for this table</p>
      </div>

      {/* Top Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Table Info */}
        <div className="flex flex-col items-center bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full lg:w-[350px] p-8 transition hover:shadow-yellow-500/10">
          <FontAwesomeIcon
            icon={faChair}
            className="text-6xl text-yellow-400 mb-4"
          />
          <h2 className="text-2xl font-semibold mb-1">Table {id}</h2>
          <p className="text-gray-400 mb-4">
            {selectedSlot ? "✅ Reserved" : "Available"}
          </p>
          {slot && (
            <div className="bg-yellow-500/20 border border-yellow-400 text-yellow-300 px-4 py-2 rounded-full text-sm flex items-center gap-2">
              <FontAwesomeIcon icon={faClock} />
              <span>
                {slot.date} — {slot.hour}
              </span>
            </div>
          )}
        </div>

        {/* Booking Table */}
        <div className="flex-1 bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-2xl">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FontAwesomeIcon
              icon={faCalendarCheck}
              className="text-yellow-400"
            />
            Available Reservation Slots
          </h3>
          <div className="overflow-x-auto rounded-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-700 text-gray-300 text-sm uppercase">
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Hours</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((res) => (
                  <tr
                    key={res.id}
                    className="border-b border-gray-700 hover:bg-gray-700/50 transition"
                  >
                    <td className="px-4 py-3">{res.date}</td>
                    <td className="px-4 py-3">{res.hour}</td>
                    <td className="px-4 py-3">
                      {bookedSlots.includes(res.id) ? (
                        <span className="text-red-400 font-medium">Booked</span>
                      ) : (
                        <button
                          onClick={() => handleBook(res.id)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-sm font-semibold px-4 py-1 rounded-full transition"
                        >
                          Book
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Order Section */}
      {selectedSlot && (
        <div className="mt-10 bg-gray-900">
          <h3 className="text-2xl font-semibold  flex items-center gap-2">
            <FontAwesomeIcon icon={faUtensils} className="text-yellow-400" />
            Order for Table #{id}
          </h3>
          <Order tableId={id} />
        </div>
      )}
    </div>
  );
}
