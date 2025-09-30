import { useParams } from "react-router-dom";

export default function TableItem() {
  const { id } = useParams();
  const reservations = [
    { id: 1, date: "2025-09-29", hour: "18:00-20:00", booked: false },
    { id: 2, date: "2025-09-29", hour: "20:00-22:00", booked: true },
    { id: 3, date: "2025-09-30", hour: "19:00-21:00", booked: false },
    { id: 4, date: "2025-09-30", hour: "21:00-23:00", booked: false },
    { id: 5, date: "2025-09-30", hour: "23:00-1:00", booked: true },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 text-white mt-2">
      {/* Profile Card */}
      <div className="bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center w-full md:w-1/3">
        <h2 className="text-2xl font-semibold">Tables {id}</h2>
        <p className="text-gray-400">Available</p>
      </div>

      {/* Profile Info Table */}
      <div className="bg-gray-800 h-[300px] rounded-2xl shadow-lg p-6 flex-1 overflow-y-auto">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-700 text-gray-300">
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">hours</th>
              <th className="px-4 py-2">book</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res) => (
              <tr key={res.id} className="hover:bg-gray-700">
                <td className="px-4 py-2 font-medium">{res.date}</td>
                <td className="px-4 py-2">{res.hour}</td>
                <td className="px-4 py-2">
                  {res.booked ? (
                    <span className="text-red-400">Booked</span>
                  ) : (
                    <button
                      className="btn btn-warning"
                      onClick={() => handleBook(res.id)}
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
  );
}
