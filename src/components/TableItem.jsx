import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChair,
  faCalendarCheck,
  faClock,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import useReservation from "../hooks/useReservation";
import { useAuth } from "@clerk/clerk-react";
import Order from "./Order";

export default function TableItem() {
  const { id } = useParams();
  const { isSignedIn, getToken } = useAuth();
  const { createReservation, getAllReservations, userData } = useReservation();

  const [reservations, setReservations] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [select, setSelect] = useState({ startTime: "", endTime: "" });

  useEffect(() => {
    (async () => {
      const data = await getAllReservations(id);
      setReservations(data);
    })();
  }, [id]);

  return (
    <div className="pt-8 pb-3 w-full mx-auto min-h-screen text-white">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <FontAwesomeIcon icon={faChair} className="text-yellow-400" />
          Table #{id}
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex flex-col items-center bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full lg:w-[350px] p-8">
          <FontAwesomeIcon
            icon={faChair}
            className="text-6xl text-yellow-400 mb-4"
          />
          <h2 className="text-2xl font-semibold mb-1">Table {id}</h2>
          <p className="text-gray-400 mb-4">
            {selectedSlot ? "✅ Reserved" : "Available"}
          </p>

          <label>Start Time</label>
          <input
            type="datetime-local"
            value={select.startTime}
            onChange={(e) =>
              setSelect({ ...select, startTime: e.target.value })
            }
            className="bg-gray-700 rounded-md p-2 mb-2"
          />
          <label>End Time</label>
          <input
            type="datetime-local"
            value={select.endTime}
            onChange={(e) => setSelect({ ...select, endTime: e.target.value })}
            className="bg-gray-700 rounded-md p-2 mb-4"
          />

          <button
            onClick={async () => {
              if (isSignedIn && getToken()) {
                const res = await createReservation(
                  userData._id,
                  id,
                  select.startTime,
                  select.endTime
                );
                if (res?._id) {
                  alert("✅ Table booked successfully!");
                  setSelectedSlot(res._id);
                }
              }
            }}
            className="bg-yellow-500 hover:bg-yellow-600 font-semibold px-4 py-2 rounded-md"
          >
            Book
          </button>
        </div>

        {/* Reservation Table */}
        <div className="flex-1 bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-2xl">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FontAwesomeIcon
              icon={faCalendarCheck}
              className="text-yellow-400"
            />
            Reservations for Table #{id}
          </h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-700 text-gray-300 text-sm uppercase">
                <th className="px-4 py-3">Start</th>
                <th className="px-4 py-3">End</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((res) => (
                <tr
                  key={res._id}
                  onClick={() => {
                    setSelectedSlot(res._id);
                  }}
                  className="border-b border-gray-700 hover:bg-gray-700/50"
                >
                  <td className="px-4 py-3">
                    {new Date(res.startTime).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(res.endTime).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">{res.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedSlot && (
        <div className="mt-10 bg-gray-900">
          <h3 className="text-2xl font-semibold flex items-center gap-2">
            <FontAwesomeIcon icon={faUtensils} className="text-yellow-400" />
            Order for Reservation #{selectedSlot}
          </h3>
          <Order tableId={id} reservationId={selectedSlot} />
        </div>
      )}
    </div>
  );
}
